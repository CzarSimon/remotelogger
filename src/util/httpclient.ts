import CircutBreaker from '@czarsimon/circutbreaker';
import uuid from 'uuid/v4';

export interface Headers {
  [name: string]: string;
}

export interface Options {
  url: string;
  method?: string;
  body?: any;
  headers?: Headers;
}

export interface Response<T, E> {
  body?: T;
  error?: Error<E>;
  status: number;
}

export interface Error<E = any> {
  body?: E;
  url: string;
  requestId: string;
  status: number;
}

const circutBreaker = new CircutBreaker({ active: true });

export async function request<T = any, E = any>(opts: Options): Promise<Response<T, E>> {
  const { body, url } = opts;
  if (circutBreaker.isOpen(url)) {
    return circutOpenResponse(url);
  }

  const headers = createHeaders(opts);
  const res = await fetch(url, {
    body: body ? JSON.stringify(body) : undefined,
    headers,
    method: opts.method,
  });
  circutBreaker.record(url, res.status);

  if (res.ok) {
    const responseBody: T = await res.json();
    return {
      body: responseBody,
      status: res.status,
    };
  } else {
    const errorBody: E = await res.json();
    return {
      error: {
        body: errorBody,
        requestId: headers['X-Request-ID'],
        status: res.status,
        url,
      },
      status: res.status,
    };
  }
}

function createHeaders(opts: Options): Headers {
  const headers: Headers = opts.headers || {};
  if (opts.body) {
    headers['Content-Type'] = 'application/json';
  }

  if (!headers['X-Request-ID']) {
    headers['X-Request-ID'] = uuid();
  }

  return headers;
}

function circutOpenResponse<T, E>(url: string): Response<T, E> {
  const status = 503;
  return {
    error: {
      requestId: 'CIRCUT_OPEN',
      status,
      url,
    },
    status,
  };
}

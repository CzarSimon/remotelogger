import { Handler } from "./base";

import { request } from "../util/httpclient";
import { Level, levelToString } from "../util/level";

import uuid from 'uuid/v4';

interface LogEvent {
  app: string
  version: string
  sessionId: string
  clientId: string
  message: string
  level: string
};

interface Options {
  url: string
  method?: string
  app: string
  version: string
  clientId: string
  sessionId?: string
};

interface StatusResponse {
  status: string
}

interface Error {
  id: string
  message: string
  statusCode: number
};

export class HttploggerHandler extends Handler {
  private level: Level;
  private opts: Options;

  constructor(level: Level, opts: Options) {
    super();
    this.level = level;
    this.opts = opts;
    if (!this.opts.method) {
      this.opts.method = "POST";
    };

    if (!this.opts.sessionId) {
      this.opts.sessionId = uuid();
    };
  };

  public getLevel(): Level {
    return this.level;
  };

  public async log(message: string, level: Level) {
    const lStr = levelToString(level)
    if (!lStr) {
      return;
    }

    const { method, url } = this.opts;
    const event = this.createLogEvent(message, lStr);
    const { error, status } = await request<StatusResponse, Error>({
      body: event,
      method,
      url,
    })

    if (error) {
      console.error(
        `HttploggerHandler:log.${lStr} rpc failed. url=${url} ` +
        `method=${method} status=${status} error=${error.body}`
      );
    };
  };

  private createLogEvent(message: string, level: string): LogEvent {
    const { app, clientId, version, sessionId } = this.opts;

    return {
      app,
      clientId,
      level,
      message,
      sessionId: sessionId!,
      version,
    };
  };

};

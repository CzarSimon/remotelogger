import uuid from 'uuid/v4';
import httpclient from "@czarsimon/httpclient";
import { Method } from 'axios';

let BASE_URL: string = "";
let HTTP_METHOD: Method = "post";
let CLIENT_NAME: string = "";
let CLIENT_VERSION: string = "";
let CLIENT_ID: string = "";
let SESSION_ID: string = uuid();

interface ConfigOptions {
    url?: string
    method?: Method
    app?: string
    version?: string
    clientId?: string
    sessionId?: string
};

type Level = ("debug" | "info" | "warning" | "error");

interface LogEvent {
    app: string
    version: string
    sessionId: string
    clientId: string
    message: string
    stacktrace?: string
    level: Level
};

function debug(message: any) {
    log(message, "debug");
};

function info(message: any) {
    log(message, "debug");
};

function warn(message: any) {
    log(message, "debug");
};

function error(message: any) {
    log(message, "debug");
};

async function log(message: any, level: Level = "info") {
    if (BASE_URL === "") {
        warnNoBaseUrl(message, level);
        return;
    }

    const event = createLogEvent(message, level);
    const { error, status } = await httpclient.request({
        url: BASE_URL,
        method: HTTP_METHOD,
        useAuth: false,
        body: event,
        timeout: 1000,
        retryOnFailure: false
    });

    if (error) {
        console.error(
            `@czarsimon/httpclient:log.${level} rpc failed. url=${BASE_URL} ` +
            `method=${HTTP_METHOD} status=${status} error=${error.message}`
        );
    }
};

function createLogEvent(message: any, level: Level): LogEvent {
    return {
        app: CLIENT_NAME,
        version: CLIENT_VERSION,
        sessionId: SESSION_ID,
        clientId: CLIENT_ID,
        message: `${message}`,
        level,
    }
};

function warnNoBaseUrl(message: any, level: Level) {
    console.error(`@czarsimon/httpclient:log.${level} failed. url is not set. Attempted to log: ${message}`);
};

function configure(opts: ConfigOptions) {
    if (opts.url) {
        BASE_URL = opts.url;
    }

    if (opts.method) {
        HTTP_METHOD = opts.method;
    }

    if (opts.app) {
        CLIENT_NAME = opts.app;
    }

    if (opts.version) {
        CLIENT_VERSION = opts.version;
    }

    if (opts.clientId) {
        CLIENT_ID = opts.clientId;
    }

    if (opts.sessionId) {
        SESSION_ID = opts.sessionId;
    }
};

const remotelogger = {
    debug,
    info,
    warn,
    error,
    configure
};

export default remotelogger;
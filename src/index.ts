import { Handlers } from "./handler";
import { Level, DEBUG, ERROR, INFO, WARNING } from "./util/level";

interface Options {
  handlers: Handlers
  name?: string
};

export class Logger {
  private handlers: Handlers;
  private name: (string | undefined);

  constructor({ handlers, name }: Options) {
    this.handlers = handlers;
    this.name = name;
  };

  public debug(message: any) {
    this.log(message, DEBUG);
  };

  public info(message: any) {
    this.log(message, INFO);
  };

  public warn(message: any) {
    this.log(message, WARNING);
  };

  public error(message: any) {
    this.log(message, ERROR);
  };

  private log(message: any, level: Level) {
    for (const name in this.handlers) {
      const handler = this.handlers[name];

      if (level < handler.getLevel()) {
        continue;
      }

      const messageStr = (this.name) ? `${this.name} - ${message}` : `${message}`;
      handler.log(messageStr, level);
    };
  };

  public configure(handlers: Handlers) {
    for (const name in handlers) {
      this.handlers[name] = handlers[name];
    };
  };

};

let defaultLogger = new Logger({
  handlers: {}
});

function debug(message: any) {
  defaultLogger.debug(message);
};

function info(message: any) {
  defaultLogger.info(message);
};

function warn(message: any) {
  defaultLogger.warn(message);
};

function error(message: any) {
  defaultLogger.error(message);
};

function configure(handlers: Handlers) {
  defaultLogger.configure(handlers);
};

const remotelogger = {
  debug,
  info,
  warn,
  error,
  configure
};

export default remotelogger;

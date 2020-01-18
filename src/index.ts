import { Handlers } from "./handler";
import { Logger } from "./logger";
import { DEBUG, ERROR, INFO, WARNING } from "./util/level";

export { Level } from "./util/level";
export { ConsoleHandler, Handlers, HttploggerHandler } from "./handler";
export { Logger } from "./logger";

export const level = {
  DEBUG,
  ERROR,
  INFO,
  WARNING,
};

const defaultLogger = new Logger({
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
  configure,
  debug,
  error,
  info,
  warn,
};

export default remotelogger;

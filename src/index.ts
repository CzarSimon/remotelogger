import { Handlers } from "./handler";
import { Level, DEBUG, ERROR, INFO, WARNING } from "./util/level";

const activeHandlers: Handlers = {};

function debug(message: any) {
  log(message, DEBUG);
};

function info(message: any) {
  log(message, INFO);
};

function warn(message: any) {
  log(message, WARNING);
};

function error(message: any) {
  log(message, ERROR);
};

function log(message: any, level: Level) {
  for (const name in activeHandlers) {
    const handler = activeHandlers[name];

    if (level < handler.getLevel()) {
      continue;
    }

    handler.log(message, level);
  };
};

function configure(handlers: Handlers) {
  for (const name in handlers) {
    activeHandlers[name] = handlers[name];
  };
};

const remotelogger = {
  debug,
  info,
  warn,
  error,
  configure
};

export default remotelogger;

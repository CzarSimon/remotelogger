import { Handlers } from "../handler";
import { DEBUG, ERROR, INFO, Level, WARNING } from "../util/level";

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

  public configure(handlers: Handlers) {
    for (const name of Object.keys(handlers)) {
      this.handlers[name] = handlers[name];
    };
  };

  private log(message: any, level: Level) {
    for (const handler of Object.values(this.handlers)) {
      if (level < handler.getLevel()) {
        continue;
      }

      const messageStr = (this.name) ? `${this.name} - ${message}` : `${message}`;
      handler.log(messageStr, level);
    };
  };

};

import { Level } from "../util/level";

export abstract class Handler {
  public abstract getLevel(): Level;
  public abstract log(message: string, level: Level): void;
}

export interface Handlers {
  [name: string]: Handler
}

import { Level } from "../util/level";

export abstract class Handler {
  abstract getLevel(): Level;
  abstract log(message: string, level: Level): void;
}

export interface Handlers {
  [name: string]: Handler
}

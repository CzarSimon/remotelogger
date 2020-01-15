import { Level } from "../util/level";

export abstract class Handler {
  abstract getLevel(): Level;
  abstract log(message: any, level: Level): void;
}

export interface Handlers {
  [name: string]: Handler
}

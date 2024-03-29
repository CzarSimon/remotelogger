import { Level, levelToString } from '../util/level';
import { Handler } from './base';

export class ConsoleHandler extends Handler {
  private level: Level;

  constructor(level: Level) {
    super();
    this.level = level;
  }

  public getLevel(): Level {
    return this.level;
  }

  public log(message: string, level: Level) {
    const lStr = levelToString(level);
    if (!lStr) {
      return;
    }

    console.log(`${lStr.toUpperCase()} - ${message}`);
  }
}

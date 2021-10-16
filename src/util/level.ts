export type Level = number;

export const DEBUG: Level = 10;
export const INFO: Level = 20;
export const WARNING: Level = 30;
export const ERROR: Level = 40;

const levelMap = {
  [DEBUG]: 'debug',
  [INFO]: 'info',
  [WARNING]: 'warning',
  [ERROR]: 'error',
};

export function levelToString(level: Level): string | undefined {
  return levelMap[level];
}

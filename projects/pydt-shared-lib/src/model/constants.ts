export const ONE_HOUR = 1000 * 60 * 60;

export const ONE_DAY = 1000 * 60 * 60 * 24;

export const HOUR_OF_DAY_KEY = "ABCDEFGHIJKLMNOPQRSTUVWX";

export const TURN_BUCKETS = [
  ONE_HOUR,
  ONE_HOUR * 2,
  ONE_HOUR * 3,
  ONE_HOUR * 6,
  ONE_HOUR * 12,
  ONE_DAY,
  ONE_DAY * 2,
  ONE_DAY * 4,
  ONE_DAY * 7,
  Number.MAX_SAFE_INTEGER,
];

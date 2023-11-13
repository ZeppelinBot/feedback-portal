import { keys } from "../../utils";

const SECONDS = 1000;
const MINUTES = 60 * SECONDS;
const HOURS = 60 * MINUTES;

type RateLimitDef = {
  count: number;
  withinMs: number;
};

export const rateLimitTypes = {
  createPost: "createPost",
  createComment: "createComment",
} as const;

type RateLimitType = typeof rateLimitTypes[keyof typeof rateLimitTypes];

const rateLimits = {
  [rateLimitTypes.createPost]: {
    count: 25,
    withinMs: 1 * HOURS,
  },
  [rateLimitTypes.createComment]: {
    count: 50,
    withinMs: 1 * HOURS,
  },
} satisfies Record<RateLimitType, RateLimitDef>;

export class RateLimiter {
  #counters: Map<RateLimitType, Map<string, number>> = new Map();
  #timers: NodeJS.Timeout[] = [];

  constructor() {
    this.resetAllRateLimits();
    for (const type of keys(rateLimits)) {
      this.#timers.push(setInterval(() => {
        this.resetRateLimitsOfType(type);
      }, rateLimits[type].withinMs));
    }
  }

  resetAllRateLimits() {
    for (const type of keys(rateLimits)) {
      this.resetRateLimitsOfType(type);
    }
  }

  resetRateLimitsOfType(type: RateLimitType) {
    this.#counters.set(type, new Map());
  }

  testRateLimit(type: RateLimitType, key: string) {
    const typeCounters = this.#counters.get(type)!;
    const count = typeCounters.get(key) ?? 0;
    if (count > rateLimits[type].count) {
      return false;
    }
    typeCounters.set(key, (typeCounters.get(key) ?? 0) + 1);
    return true;
  }
}

export const rateLimiter = new RateLimiter();

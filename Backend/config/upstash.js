import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import "dotenv/config";

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error("Missing Upstash credentials. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.");
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "60 s"),
});

export default ratelimit;

import ratelimit from "../config/upstash.js";

const  rateLimiter = async (req, res, next) => {
    try {
        // Use a fixed key for simplicity; in production, consider using user-specific keys
        const { success } = await ratelimit.limit("my-rate-limit");
        if (!success) {
            return res.status(429).json({ error: 'Too many requests try again later' });
        }
        next();
    }
    catch (error) {
        console.error('Rate limiter error:', error);
        // In case of rate limiter error, allow the request to proceed
        next();
    }
}
export default rateLimiter;
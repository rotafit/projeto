"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = exports.rateLimiterMiddleware = void 0;
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const rateLimiterInstance = new rate_limiter_flexible_1.RateLimiterMemory({
    keyGenerator: (req) => req.ip || 'unknown',
    points: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // Number of requests
    duration: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900'), // Per 15 minutes (900 seconds)
});
const rateLimiterMiddleware = async (req, res, next) => {
    try {
        await rateLimiterInstance.consume(req.ip || 'unknown');
        next();
    }
    catch (rejRes) {
        const secs = Math.round(rejRes.msBeforeNext / 1000) || 1;
        res.set('Retry-After', String(secs));
        res.status(429).json({
            status: 'error',
            message: 'Too many requests, please try again later.',
            retryAfter: secs
        });
    }
};
exports.rateLimiterMiddleware = rateLimiterMiddleware;
exports.rateLimiter = exports.rateLimiterMiddleware;

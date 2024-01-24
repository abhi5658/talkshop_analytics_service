const { rateLimit } = require('express-rate-limit');

const rateLimiter = rateLimit({
    windowMs: process.env.NODE_ENV === 'test' ? (10 * 60 * 1000) : (5 * 1000), // 10 mins for test OR  5 seconds for prod
    max: process.env.NODE_ENV === 'test' ? 100 : 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res, next, options) => res.status(options.statusCode).json({ message: options.message })
});

module.exports = rateLimiter;
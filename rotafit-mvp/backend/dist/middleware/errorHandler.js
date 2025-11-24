"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    console.error('Error:', err);
    // Prisma errors
    if (err.name === 'PrismaClientKnownRequestError') {
        err.statusCode = 400;
        err.message = 'Database error';
    }
    // Validation errors
    if (err.name === 'ValidationError') {
        err.statusCode = 400;
        err.message = 'Validation error';
    }
    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        err.statusCode = 401;
        err.message = 'Invalid token';
    }
    res.status(err.statusCode).json({
        status: 'error',
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};
exports.errorHandler = errorHandler;

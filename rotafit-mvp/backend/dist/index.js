"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const joi_1 = __importDefault(require("joi"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Initialize Prisma
const prisma = new client_1.PrismaClient();
// Middlewares
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, morgan_1.default)('combined'));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Validation schemas
const registerSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    firstName: joi_1.default.string().min(2).required(),
    lastName: joi_1.default.string().min(2).required(),
    phone: joi_1.default.string().optional()
});
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
});
// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'RotaFit+ API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});
// Register endpoint
app.post('/api/auth/register', async (req, res) => {
    try {
        const { error, value } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message
            });
        }
        const { email, password, firstName, lastName, phone } = value;
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            return res.status(409).json({
                status: 'error',
                message: 'User already exists with this email'
            });
        }
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        // Create user with 7-day trial
        const trialStartDate = new Date();
        const trialEndDate = new Date();
        trialEndDate.setDate(trialEndDate.getDate() + 7);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                phone,
                trialStartDate,
                trialEndDate
            }
        });
        // Generate JWT
        const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, JWT_SECRET);
        // Calculate trial days
        const trialDaysLeft = user.trialEndDate
            ? Math.max(0, Math.ceil((user.trialEndDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
            : 0;
        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    trialEndDate: user.trialEndDate
                },
                token,
                trialDaysLeft
            }
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
});
// Login endpoint
app.post('/api/auth/login', async (req, res) => {
    try {
        const { error, value } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message
            });
        }
        const { email, password } = value;
        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
            include: { subscription: true }
        });
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password'
            });
        }
        // Check password
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password'
            });
        }
        // Check if user is active
        if (!user.isActive) {
            return res.status(403).json({
                status: 'error',
                message: 'Account is inactive'
            });
        }
        // Generate JWT
        const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, JWT_SECRET);
        // Calculate trial days
        const trialDaysLeft = user.trialEndDate
            ? Math.max(0, Math.ceil((user.trialEndDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
            : 0;
        res.json({
            status: 'success',
            message: 'Login successful',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    subscription: user.subscription ? {
                        name: user.subscription.name,
                        price: user.subscription.price
                    } : null,
                    trialDaysLeft,
                    trialEndDate: user.trialEndDate
                },
                token
            }
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
});
// Verify token endpoint
app.get('/api/auth/verify', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Token required'
            });
        }
        const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            include: { subscription: true }
        });
        if (!user || !user.isActive) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid token'
            });
        }
        const trialDaysLeft = user.trialEndDate
            ? Math.max(0, Math.ceil((user.trialEndDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
            : 0;
        res.json({
            status: 'success',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    subscription: user.subscription ? {
                        name: user.subscription.name,
                        price: user.subscription.price
                    } : null,
                    trialDaysLeft,
                    trialEndDate: user.trialEndDate
                }
            }
        });
    }
    catch (error) {
        res.status(401).json({
            status: 'error',
            message: 'Invalid token'
        });
    }
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Something went wrong!'
    });
});
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Not found'
    });
});
// Start server
const server = app.listen(PORT, () => {
    console.log(`🚀 RotaFit+ Backend Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);
    console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});
// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(async () => {
        console.log('HTTP server closed.');
        await prisma.$disconnect();
        process.exit(0);
    });
});
process.on('SIGINT', async () => {
    console.log('SIGINT received. Shutting down gracefully...');
    server.close(async () => {
        console.log('HTTP server closed.');
        await prisma.$disconnect();
        process.exit(0);
    });
});
exports.default = app;

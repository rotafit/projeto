"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const joi_1 = __importDefault(require("joi"));
const index_1 = require("../index");
const router = express_1.default.Router();
// Validation schemas
const registerSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    firstName: joi_1.default.string().min(2).required(),
    lastName: joi_1.default.string().min(2).required(),
    phone: joi_1.default.string().optional(),
    plan: joi_1.default.string().valid('ESSENCIAL', 'AVANCADO', 'PREMIUM_IA').optional()
});
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
});
// Register
router.post('/register', async (req, res, next) => {
    try {
        const { error, value } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message
            });
        }
        const { email, password, firstName, lastName, phone, plan } = value;
        // Check if user already exists
        const existingUser = await index_1.prisma.user.findUnique({
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
        const user = await index_1.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                phone,
                trialStartDate,
                trialEndDate
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                trialEndDate: true,
                createdAt: true
            }
        });
        // Generate JWT with explicit typing
        const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
        const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            email: user.email
        }, JWT_SECRET);
        // Calculate trial days
        const trialDaysLeft = user.trialEndDate
            ? Math.max(0, Math.ceil((user.trialEndDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
            : 0;
        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            data: {
                user,
                token,
                trialDaysLeft
            }
        });
    }
    catch (error) {
        next(error);
    }
});
// Login
router.post('/login', async (req, res, next) => {
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
        const user = await index_1.prisma.user.findUnique({
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
        // Generate JWT with explicit typing
        const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
        const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            email: user.email
        }, JWT_SECRET);
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
        next(error);
    }
});
// Verify token
router.get('/verify', async (req, res, next) => {
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
        const user = await index_1.prisma.user.findUnique({
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
exports.default = router;

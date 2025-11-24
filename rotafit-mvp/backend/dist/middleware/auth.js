"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSubscription = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index");
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Access token required'
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Check if user still exists and is active
        const user = await index_1.prisma.user.findUnique({
            where: { id: decoded.userId },
            include: { subscription: true }
        });
        if (!user || !user.isActive) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid token or user not found'
            });
        }
        req.user = {
            id: user.id,
            email: user.email,
            subscriptionId: user.subscriptionId || undefined,
            trialEndDate: user.trialEndDate || undefined
        };
        next();
    }
    catch (error) {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid or expired token'
        });
    }
};
exports.authenticateToken = authenticateToken;
const checkSubscription = (requiredPlan, allowTrial = false) => {
    return async (req, res, next) => {
        try {
            if (!req.user?.subscriptionId) {
                return res.status(403).json({
                    status: 'error',
                    message: 'Subscription required',
                    requiresUpgrade: true
                });
            }
            const user = await index_1.prisma.user.findUnique({
                where: { id: req.user.id },
                include: { subscription: true }
            });
            if (!user?.subscription) {
                return res.status(403).json({
                    status: 'error',
                    message: 'Invalid subscription',
                    requiresUpgrade: true
                });
            }
            // Check trial period
            if (allowTrial && user.trialEndDate && user.trialEndDate > new Date()) {
                return next();
            }
            // Check subscription level
            const userPlanLevel = getPlanLevel(user.subscription.name);
            const requiredPlanLevel = getPlanLevel(requiredPlan);
            if (userPlanLevel < requiredPlanLevel) {
                return res.status(403).json({
                    status: 'error',
                    message: `This feature requires ${requiredPlan} plan or higher`,
                    currentPlan: user.subscription.name,
                    requiredPlan,
                    requiresUpgrade: true
                });
            }
            next();
        }
        catch (error) {
            return res.status(500).json({
                status: 'error',
                message: 'Error checking subscription'
            });
        }
    };
};
exports.checkSubscription = checkSubscription;
const getPlanLevel = (planName) => {
    switch (planName.toLowerCase()) {
        case 'essencial':
            return 1;
        case 'avancado':
            return 2;
        case 'premium ia':
            return 3;
        default:
            return 0;
    }
};

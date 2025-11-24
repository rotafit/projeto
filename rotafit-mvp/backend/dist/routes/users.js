"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const index_1 = require("../index");
const router = express_1.default.Router();
// Get current user profile
router.get('/profile', auth_1.authenticateToken, async (req, res) => {
    try {
        const user = await index_1.prisma.user.findUnique({
            where: { id: req.user.id },
            include: { subscription: true }
        });
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }
        res.json({
            status: 'success',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phone: user.phone,
                    birthDate: user.birthDate,
                    gender: user.gender,
                    weight: user.weight,
                    height: user.height,
                    activityLevel: user.activityLevel,
                    subscription: user.subscription,
                    trialEndDate: user.trialEndDate
                }
            }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error fetching user profile'
        });
    }
});
// Update user profile
router.put('/profile', auth_1.authenticateToken, async (req, res) => {
    try {
        const { firstName, lastName, phone, birthDate, gender, weight, height, activityLevel } = req.body;
        const updatedUser = await index_1.prisma.user.update({
            where: { id: req.user.id },
            data: {
                ...(firstName && { firstName }),
                ...(lastName && { lastName }),
                ...(phone && { phone }),
                ...(birthDate && { birthDate: new Date(birthDate) }),
                ...(gender && { gender }),
                ...(weight && { weight }),
                ...(height && { height }),
                ...(activityLevel && { activityLevel })
            },
            include: { subscription: true }
        });
        res.json({
            status: 'success',
            message: 'Profile updated successfully',
            data: {
                user: {
                    id: updatedUser.id,
                    email: updatedUser.email,
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    phone: updatedUser.phone,
                    birthDate: updatedUser.birthDate,
                    gender: updatedUser.gender,
                    weight: updatedUser.weight,
                    height: updatedUser.height,
                    activityLevel: updatedUser.activityLevel,
                    subscription: updatedUser.subscription
                }
            }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error updating profile'
        });
    }
});
exports.default = router;

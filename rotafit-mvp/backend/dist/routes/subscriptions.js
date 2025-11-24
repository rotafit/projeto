"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../index");
const router = express_1.default.Router();
// Get available subscriptions
router.get('/', async (req, res) => {
    try {
        const subscriptions = await index_1.prisma.subscription.findMany({
            where: { isActive: true },
            orderBy: { price: 'asc' }
        });
        res.json({
            status: 'success',
            data: { subscriptions }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error fetching subscriptions'
        });
    }
});
exports.default = router;

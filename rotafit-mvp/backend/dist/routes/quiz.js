"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Placeholder routes for quiz
router.post('/submit', auth_1.authenticateToken, async (req, res) => {
    res.json({
        status: 'success',
        data: {
            message: 'Quiz submission endpoint - coming soon'
        }
    });
});
router.get('/personalize', auth_1.authenticateToken, async (req, res) => {
    res.json({
        status: 'success',
        data: {
            message: 'AI personalization endpoint - coming soon'
        }
    });
});
exports.default = router;

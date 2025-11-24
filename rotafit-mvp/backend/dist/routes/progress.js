"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Placeholder routes for progress tracking
router.get('/', auth_1.authenticateToken, async (req, res) => {
    res.json({
        status: 'success',
        data: {
            progressEntries: [],
            message: 'Progress tracking endpoint - coming soon'
        }
    });
});
router.post('/', auth_1.authenticateToken, async (req, res) => {
    res.json({
        status: 'success',
        data: {
            message: 'Add progress entry endpoint - coming soon'
        }
    });
});
exports.default = router;

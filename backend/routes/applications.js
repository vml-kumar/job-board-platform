import express from 'express';
import { applyToJob } from '../controllers/applicationController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, applyToJob);

export default router;

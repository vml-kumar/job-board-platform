import express from 'express';
import { postJob, recruiterJobs, getRecruiterJobs } from '../controllers/jobController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/post', verifyToken, postJob);
router.get('/recruiter', verifyToken, recruiterJobs);
router.get('/myjobs', verifyToken, getRecruiterJobs);


export default router;

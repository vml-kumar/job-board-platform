import express from 'express';
import { applyToJob, getRecruiterApplications, changeApplicationStatus, getCandidateApplications } from '../controllers/applicationController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, applyToJob);
router.get('/recruiter', verifyToken, getRecruiterApplications);
router.put('/:id/status', verifyToken, changeApplicationStatus);
router.get('/myapplications', verifyToken, getCandidateApplications);


export default router;

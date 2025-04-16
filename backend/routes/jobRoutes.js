import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { postJob, getRecruiterJobs, deleteJob, updateJob, getAllJobs, getAppliedJobs } from '../controllers/jobController.js';

const router = express.Router();

router.post('/post', verifyToken, postJob);
router.get('/myjobs', verifyToken, getRecruiterJobs);
router.delete('/:id', verifyToken, deleteJob);
router.put('/:id', verifyToken, updateJob);
router.get('/', getAllJobs);
router.get('/applied', verifyToken, getAppliedJobs);
  
export default router;

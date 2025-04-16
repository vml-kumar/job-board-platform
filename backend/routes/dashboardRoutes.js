// routes/dashboardRoutes.ts
import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/overview', verifyToken, (req, res) => {
    const userId = req.user.id;
    const role = req.user.role;
  
    let stats;
  
    if (role === 'freelancer') {
      stats = {
        totalApplications: 5,
        messages: 3,
        activeJobs: 2,
      };
    } else if (role === 'recruiter') {
      stats = {
        totalJobsPosted: 10,
        applicants: 50,
        jobStatus: 'Active',
      };
    }
  
    res.status(200).json({ stats });
  });
  

export default router;

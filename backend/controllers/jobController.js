import { createJob, getJobsByRecruiter } from '../models/jobModel.js';

export const postJob = (req, res) => {
  const { title, description, location, salary } = req.body;
  const recruiter_id = req.user.id; // assuming JWT middleware attaches user

  if (!title || !description || !location || !salary) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  createJob({ title, description, location, salary, recruiter_id }, (err, result) => {
    if (err) {
      console.error('Error posting job:', err);
      return res.status(500).json({ message: 'Error posting job' });
    }

    return res.status(201).json({ message: 'Job posted successfully', jobId: result.insertId });
  });
};

export const recruiterJobs = (req, res) => {
  const recruiter_id = req.user.id;

  // getJobsByRecruiter(recruiter_id, (err, jobs) => {
  //   if (err) {
  //     return res.status(500).json({ message: 'Failed to fetch jobs' });
  //   }

  //   return res.json({ jobs });
  // });
};

export const getRecruiterJobs = (req, res) => {
  const recruiterId = req.user.id;

  getJobsByRecruiter(recruiterId, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    
    res.status(200).json({ jobs: results });
  });
};

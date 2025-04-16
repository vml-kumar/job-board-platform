import {
  createJob, 
  getJobsByRecruiter,
  deleteJobById,
  updateJobById,
  getJobCountByRecruiter,
  getPublicJobs,
  countPublicJobs,
  getAppliedJobsByUserId
} from '../models/jobModel.js';

// POST a new job
export const postJob = async (req, res) => {
  try {
    const { title, description, location, salary } = req.body;
    const recruiter_id = req.user.id;

    if (!title || !description || !location || !salary) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const jobId = await createJob({ title, description, location, salary, recruiter_id });

    return res.status(201).json({ message: 'Job posted successfully', jobId });
  } catch (error) {
    console.error('Error posting job:', error);
    return res.status(500).json({ message: 'Error posting job' });
  }
};

// GET recruiter's jobs with pagination & search
export const getRecruiterJobs = async (req, res) => {
  try {
    const recruiterId = req.user.id;
    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    const jobs = await getJobsByRecruiter(recruiterId, search, offset, limit);
    const count = await getJobCountByRecruiter(recruiterId, search);
    const totalPages = Math.ceil(count / limit);

    return res.json({ jobs, totalPages });
  } catch (error) {
    console.error('Error fetching recruiter jobs:', error);
    return res.status(500).json({ message: 'Failed to fetch jobs' });
  }
};

// DELETE a job
export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const result = await deleteJobById(jobId);

    if (result === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    return res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    return res.status(500).json({ message: 'Failed to delete job' });
  }
};

// PUT/UPDATE a job
export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const result = await updateJobById(jobId, req.body);

    if (result === 0) {
      return res.status(404).json({ message: 'Job not found or no changes made' });
    }

    return res.status(200).json({ message: 'Job updated successfully' });
  } catch (error) {
    console.error('Error updating job:', error);
    return res.status(500).json({ message: 'Failed to update job' });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const { search = '', page = 1 } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    const jobs = await getPublicJobs(search, limit, offset);
    const totalCount = await countPublicJobs(search);

    res.status(200).json({
      jobs,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user.id; // Get the current user's ID from the JWT token
    const appliedJobIds = await getAppliedJobsByUserId(userId); // Get applied jobs from the model
    res.json({ appliedJobIds }); // Send the applied job IDs as a response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch applied jobs' });
  }
};
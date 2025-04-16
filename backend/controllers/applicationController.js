import { createApplication, hasAlreadyApplied, getApplicationsByRecruiter, updateApplicationStatus, getApplicationsByCandidate } from '../models/applicationModel.js';

export const applyToJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const { job_id, cover_letter } = req.body;

    if (!job_id) {
      return res.status(400).json({ error: 'Job ID is required' });
    }

    const alreadyApplied = await hasAlreadyApplied(userId, job_id);
    if (alreadyApplied) {
      return res.status(409).json({ error: 'You have already applied to this job.' });
    }

    const applicationId = await createApplication(userId, job_id, cover_letter);
    res.status(201).json({ message: 'Application submitted successfully', applicationId });
  } catch (err) {
    console.error('Error applying to job:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRecruiterApplications = async (req, res) => {
  try {
    const recruiterId = req.user.id;
    const applications = await getApplicationsByRecruiter(recruiterId);
    res.status(200).json({ applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
};

export const changeApplicationStatus = async (req, res) => {
  const applicationId = req.params.id;
  const { status } = req.body;

  if (!['Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    await updateApplicationStatus(applicationId, status);
    res.status(200).json({ message: `Application ${status.toLowerCase()} successfully` });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Failed to update status' });
  }
};

export const getCandidateApplications = async (req, res) => {
  try {
    const userId = req.user.id;
    const applications = await getApplicationsByCandidate(userId);
    res.status(200).json({ applications });
  } catch (error) {
    console.error('Error fetching candidate applications:', error);
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
};

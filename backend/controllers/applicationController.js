import { createApplication, hasAlreadyApplied } from '../models/applicationModel.js';

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

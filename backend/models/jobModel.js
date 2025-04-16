import db from '../config/db.js'; // Adjust path as per your structure

export const createJob = (jobData, callback) => {
  const { title, description, location, salary, recruiter_id } = jobData;

  const query = `
    INSERT INTO jobs (title, description, location, salary, recruiter_id, created_at)
    VALUES (?, ?, ?, ?, ?, NOW())
  `;

  db.query(query, [title, description, location, salary, recruiter_id], callback);
};

export const getJobsByRecruiter = (recruiterId, callback) => {
  const query = `
    SELECT id, title, description, location, salary, created_at
    FROM jobs
    WHERE recruiter_id = ?
    ORDER BY created_at DESC
  `;
  db.query(query, [recruiterId], callback);
};


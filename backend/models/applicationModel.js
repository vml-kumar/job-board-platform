import db from '../config/db.js';

export const createApplication = async (userId, jobId, coverLetter = '') => {
  const [result] = await db.execute(
    'INSERT INTO applications (user_id, job_id, cover_letter) VALUES (?, ?, ?)',
    [userId, jobId, coverLetter]
  );
  return result.insertId;
};

export const hasAlreadyApplied = async (userId, jobId) => {
  const [rows] = await db.execute(
    'SELECT id FROM applications WHERE user_id = ? AND job_id = ?',
    [userId, jobId]
  );
  return rows.length > 0;
};

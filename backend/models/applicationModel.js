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

export const getApplicationsByRecruiter = async (recruiterId) => {
  const query = `
    SELECT a.id AS application_id, a.cover_letter, a.created_at,a.status,
           u.name AS candidate_name, u.email AS candidate_email,
           j.title AS job_title
    FROM applications a
    JOIN users u ON a.user_id = u.id
    JOIN jobs j ON a.job_id = j.id
    WHERE j.recruiter_id = ?
    ORDER BY a.created_at DESC
  `;
  const [rows] = await db.query(query, [recruiterId]);
  return rows;
};

export const updateApplicationStatus = async (applicationId, status) => {
  const query = 'UPDATE applications SET status = ? WHERE id = ?';
  const [result] = await db.query(query, [status, applicationId]);
  return result;
};

export const getApplicationsByCandidate = async (userId) => {
  const query = `
    SELECT a.id AS application_id, a.cover_letter, a.created_at, a.status,
           j.title AS job_title, j.company, j.location
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    WHERE a.user_id = ?
    ORDER BY a.created_at DESC
  `;
  console.log("query" , query);
  
  const [rows] = await db.query(query, [userId]);
  return rows;
};
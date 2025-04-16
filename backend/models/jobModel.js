import db from '../config/db.js'; // Adjust path as per your structure

// Create Job
export const createJob = async (jobData) => {
  const { company, title, description, location, salary, recruiter_id } = jobData;

  const query = `
    INSERT INTO jobs (recruiter_id, title, description, company, location, salary, created_at)
    VALUES (?, ?, ?, ?, ?, ?, NOW())
  `;
  const [result] = await db.query(query, [recruiter_id, title, description, company, location, salary]);
  return result.insertId;
};

// Get Jobs by Recruiter with Pagination & Search
export const getJobsByRecruiter = async (recruiterId, search, offset, limit) => {
  const query = `
    SELECT * FROM jobs
    WHERE recruiter_id = ? AND title LIKE ?
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;
  const [rows] = await db.query(query, [recruiterId, `%${search}%`, limit, offset]);
  return rows;
};

// Delete Job by ID
export const deleteJobById = async (jobId) => {
  const [result] = await db.query(`DELETE FROM jobs WHERE id = ?`, [jobId]);
  return result.affectedRows;
};

// Update Job by ID
export const updateJobById = async (jobId, updatedData) => {
  const { title, description, location, salary } = updatedData;

  const [result] = await db.query(
    `UPDATE jobs SET title = ?, description = ?, location = ?, salary = ? WHERE id = ?`,
    [title, description, location, salary, jobId]
  );
  return result.affectedRows;
};

// Get Job Count for Recruiter with Search
export const getJobCountByRecruiter = async (recruiterId, search) => {
  const query = `
    SELECT COUNT(*) AS count FROM jobs
    WHERE recruiter_id = ? AND title LIKE ?
  `;
  const [rows] = await db.query(query, [recruiterId, `%${search}%`]);
  return rows[0].count;
};

export const getPublicJobs = async (search, limit, offset) => {
  const [rows] = await db.query(
    `SELECT * FROM jobs WHERE title LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [`%${search}%`, limit, offset]
  );
  return rows;
};

export const countPublicJobs = async (search) => {
  const [[{ count }]] = await db.query(
    `SELECT COUNT(*) AS count FROM jobs WHERE title LIKE ?`,
    [`%${search}%`]
  );
  return count;
};

export const getAppliedJobsByUserId = async (userId) => {
  try {
    const [rows] = await db.query('SELECT job_id FROM applications WHERE user_id = ?', [userId]);
    return rows.map(row => row.job_id); // Return an array of job IDs
  } catch (err) {
    console.error('Error fetching applied jobs:', err);
    throw err; // Throw error to be handled by controller
  }
};
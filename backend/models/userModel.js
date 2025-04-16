import db from '../config/db.js';

export const findUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0]; // assuming you're just checking for a single user
};

export const createUser = async (name, email, password, role) => {
  const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
  const [result] = await db.query(sql, [name, email, password, role]);
  return result.insertId; // return the new user's ID
};
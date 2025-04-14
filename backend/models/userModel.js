import db from '../config/db.js';

export const findUserByEmail = (email, callback) => {
  db.query('SELECT * FROM users WHERE email = ?', [email], callback);
};

export const createUser = (name, email, password, callback) => {
  db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], callback);
};

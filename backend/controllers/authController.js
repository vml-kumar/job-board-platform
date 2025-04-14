import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/userModel.js';

// Register Controller
export const register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  findUserByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    createUser(name, email, hashedPassword, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error registering user' });
      }

      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
     
      return res.status(201).json({
        message: 'User registered successfully',
        token,
        user: { name, email },
      });
    });
  });
};

// Login Controller
export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });

  findUserByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = results[0];
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    console.log("scret",process.env.JWT_SECRET);
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
};

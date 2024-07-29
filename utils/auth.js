// utils/auth.js

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET_KEY = process.env.JWT_SECRET;

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const createToken = (user) => {
  return jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};

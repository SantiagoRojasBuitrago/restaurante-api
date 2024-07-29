// utils/middleware.js

import { verifyToken } from './auth';

export const authenticate = (handler) => async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  req.user = decoded;
  return handler(req, res);
};

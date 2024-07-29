// pages/api/protected-route.js

import { authenticate } from '../../utils/middleware';
import dbConnect from '../../utils/dbConnect';

const handler = async (req, res) => {
  await dbConnect();

  res.status(200).json({ message: 'Ruta protegida', user: req.user });
};

export default authenticate(handler);

// pages/api/auth/login.js

import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import { comparePassword, createToken } from '../../../utils/auth';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
          return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
          return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        const token = createToken(user);

        res.status(200).json({ token });
      } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Método ${method} no permitido`);
  }
}

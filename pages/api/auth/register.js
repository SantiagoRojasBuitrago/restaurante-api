// pages/api/auth/register.js

import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import { hashPassword, createToken } from '../../../utils/auth';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        const token = createToken(newUser);

        res.status(201).json({ token });
      } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Método ${method} no permitido`);
  }
}

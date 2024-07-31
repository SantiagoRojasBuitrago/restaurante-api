// pages/api/auth/register.js

import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import { hashPassword, createToken } from '../../../utils/auth';

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registro de nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: El correo electrónico del usuario.
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario.
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Roles asignados al usuario. Por defecto, se asigna 'user'.
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: El token de autenticación.
 *       400:
 *         description: El usuario ya existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error del servidor.
 */

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { email, password, roles = ['user'] } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({ email, password: hashedPassword, roles });
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

// pages/api/auth/login.js

import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import { comparePassword, createToken } from '../../../utils/auth';

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login de usuario
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
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: El token de autenticación que incluye el email, id y roles del usuario.
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: El ID del usuario.
 *                     email:
 *                       type: string
 *                       description: El correo electrónico del usuario.
 *                     roles:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Los roles asignados al usuario.
 *       400:
 *         description: Usuario no encontrado o contraseña incorrecta
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

        // Incluye toda la información del usuario en la respuesta
        res.status(200).json({
          token,
          user: {
            id: user._id,
            email: user.email,
            roles: user.roles, // Asegúrate de que roles esté definido en el modelo de usuario
          },
        });
      } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Método ${method} no permitido`);
  }
}

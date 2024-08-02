import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import { hashPassword } from '../../../utils/auth';
import corsMiddleware from '../../../utils/corsMiddleware';


/**
 * @swagger
 * /api/meseros/{id}:
 *   get:
 *     summary: Obtener un mesero por ID
 *     description: Recupera un usuario con el ID especificado y con rol de "waiter".
 *     tags: [Meseros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del mesero a recuperar.
 *     responses:
 *       200:
 *         description: Mesero encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     nombre:
 *                       type: string
 *                     apellido:
 *                       type: string
 *                     telefono:
 *                       type: string
 *                     numeroIdentidad:
 *                       type: string
 *                     email:
 *                       type: string
 *                     password:
 *                       type: string
 *                     roles:
 *                       type: array
 *                       items:
 *                         type: string
 *       404:
 *         description: Mesero no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Error al obtener el mesero.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *   put:
 *     summary: Actualizar un mesero por ID
 *     description: Actualiza un usuario con el ID especificado y con rol de "waiter".
 *     tags: [Meseros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del mesero a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               telefono:
 *                 type: string
 *               numeroIdentidad:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Mesero actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     nombre:
 *                       type: string
 *                     apellido:
 *                       type: string
 *                     telefono:
 *                       type: string
 *                     numeroIdentidad:
 *                       type: string
 *                     email:
 *                       type: string
 *                     password:
 *                       type: string
 *                     roles:
 *                       type: array
 *                       items:
 *                         type: string
 *       400:
 *         description: Error al actualizar el mesero.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *       404:
 *         description: Mesero no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 */

export default async (req, res) => {
  // Maneja solicitudes OPTIONS antes de cualquier otra lógica
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  try {
    await corsMiddleware(req, res); // Asegúrate de que CORS se ejecute primero
  } catch (error) {
    return res.status(500).json({ success: false, error: 'CORS middleware failed' });
  }

  await dbConnect();

  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const mesero = await User.findById(id).exec();
        if (!mesero || mesero.roles.indexOf('waiter') === -1) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: mesero });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'PUT':
      try {
        const { password, ...rest } = req.body;
        let updatedFields = { ...rest };
        if (password) {
          const hashedPassword = await hashPassword(password);
          updatedFields.password = hashedPassword;
        }
        const mesero = await User.findByIdAndUpdate(id, updatedFields, {
          new: true,
          runValidators: true,
        }).exec();
        if (!mesero || mesero.roles.indexOf('waiter') === -1) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: mesero });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

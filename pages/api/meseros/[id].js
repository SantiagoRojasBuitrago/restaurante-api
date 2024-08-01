import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

dbConnect();

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
 *         description: Mesero actualizado.
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
 *   delete:
 *     summary: Eliminar un mesero por ID
 *     description: Elimina un usuario con el ID especificado y con rol de "waiter".
 *     tags: [Meseros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del mesero a eliminar.
 *     responses:
 *       200:
 *         description: Mesero eliminado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
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
 *         description: Error al eliminar el mesero.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 * */

export default async (req, res) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const user = await User.findOne({ _id: id, roles: 'waiter' });
        if (!user) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'PUT':
      try {
        const { nombre, apellido, telefono, numeroIdentidad, email, password, roles } = req.body;
        const user = await User.findOneAndUpdate(
          { _id: id, roles: 'waiter' },
          { nombre, apellido, telefono, numeroIdentidad, email, password, roles },
          { new: true, runValidators: true }
        );
        if (!user) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'DELETE':
      try {
        const deletedUser = await User.deleteOne({ _id: id, roles: 'waiter' });
        if (!deletedUser.deletedCount) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

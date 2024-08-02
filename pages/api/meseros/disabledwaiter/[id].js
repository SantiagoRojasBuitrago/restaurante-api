import dbConnect from '../../../../utils/dbConnect';
import User from '../../../../models/User';

/**
 * @swagger
 * /api/meseros/disabledwaiter/{id}:
 *   patch:
 *     summary: Deshabilitar un mesero por ID
 *     description: Actualiza el estado de un mesero a "Disabled" usando su ID.
 *     tags: [Meseros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del mesero a deshabilitar.
 *     responses:
 *       200:
 *         description: Mesero deshabilitado exitosamente.
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
 *                     roles:
 *                       type: array
 *                       items:
 *                         type: string
 *                     estado:
 *                       type: string
 *                       description: Estado del mesero.
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
 *         description: Error al deshabilitar el mesero.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 */

export default async (req, res) => {
  await dbConnect();

  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'PATCH':
      try {
        const mesero = await User.findByIdAndUpdate(
          id,
          { estado: 'Disabled' },
          { new: true, runValidators: true }
        ).exec();
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

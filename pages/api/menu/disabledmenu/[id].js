import dbConnect from '../../../../utils/dbConnect';
import Menu from '../../../../models/Menu';
import corsMiddleware from '../../../../utils/corsMiddleware';

/**
 * @swagger
 * /api/menus/disabledmenu/{id}:
 *   patch:
 *     summary: Deshabilitar un ítem del menú por ID
 *     description: Actualiza el estado de un ítem del menú a "Disabled" usando su ID.
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del ítem del menú a deshabilitar.
 *     responses:
 *       200:
 *         description: Ítem del menú deshabilitado exitosamente.
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
 *                     ingredientes:
 *                       type: array
 *                       items:
 *                         type: string
 *                     precio:
 *                       type: number
 *                     estado:
 *                       type: string
 *                       description: Estado del ítem del menú.
 *       404:
 *         description: Ítem no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Error al deshabilitar el ítem del menú.
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
  await corsMiddleware(req, res);
  await dbConnect();

  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'PATCH':
      try {
        const menu = await Menu.findByIdAndUpdate(
          id,
          { estado: 'Disabled' },
          { new: true, runValidators: true }
        ).exec();
        if (!menu) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: menu });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

import dbConnect from '../../../utils/dbConnect';
import Orden from '../../../models/orden';

dbConnect();

/**
 * @swagger
 * /api/ordenes/cancelar:
 *   put:
 *     summary: Cancelar una orden
 *     description: Cambia el estado de una orden a "cancelado".
 *     tags: [Ordenes]
 *     parameters:
 *       - in: query
 *         name: ordenId
 *         schema:
 *           type: string
 *         required: true
 *         description: Identificador de la orden que se desea cancelar.
 *     responses:
 *       200:
 *         description: Orden cancelada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Orden cancelada con éxito.
 *       400:
 *         description: Error al cancelar la orden.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: No se pudo cancelar la orden.
 */

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'PUT':
      try {
        const { ordenId } = req.query;
        const orden = await Orden.findById(ordenId);
        if (!orden) {
          return res.status(404).json({ success: false, error: 'Orden no encontrada' });
        }
        orden.estado = 'cancelado';
        await orden.save();
        res.status(200).json({ success: true, message: 'Orden cancelada con éxito.' });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, error: 'Método no permitido' });
      break;
  }
};

import dbConnect from '../../../utils/dbConnect';
import DetalleOrden from '../../../models/DetalleOrden';

/**
 * @swagger
 * /api/detalleOrden/{id}:
 *   get:
 *     summary: Obtiene el detalle de una orden por ID
 *     tags: [DetalleOrden]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del detalle de la orden
 *     responses:
 *       200:
 *         description: Detalle de la orden encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/DetalleOrden'
 *       404:
 *         description: Detalle de la orden no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Error de solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *   put:
 *     summary: Actualiza un detalle de orden por ID
 *     tags: [DetalleOrden]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del detalle de la orden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DetalleOrden'
 *     responses:
 *       200:
 *         description: Detalle de la orden actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/DetalleOrden'
 *       404:
 *         description: Detalle de la orden no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Error de solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *   delete:
 *     summary: Elimina un detalle de orden por ID
 *     tags: [DetalleOrden]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del detalle de la orden
 *     responses:
 *       200:
 *         description: Detalle de la orden eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       404:
 *         description: Detalle de la orden no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Error de solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 */

dbConnect();

export default async (req, res) => {
  const { query: { id }, method } = req;

  switch (method) {
    case 'GET':
      try {
        const detalle = await DetalleOrden.findById(id);
        if (!detalle) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: detalle });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const detalle = await DetalleOrden.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!detalle) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: detalle });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedDetalle = await DetalleOrden.deleteOne({ _id: id });
        if (!deletedDetalle) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

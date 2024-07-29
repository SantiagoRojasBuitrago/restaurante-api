import dbConnect from '../../../utils/dbConnect';
import Orden from '../../../models/orden';

dbConnect();

/**
 * @swagger
 * /api/ordenes/paginate:
 *   get:
 *     summary: Obtener órdenes con paginación
 *     description: Obtiene una lista de órdenes con paginación.
 *     tags: [Ordenes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         default: 1
 *         description: Número de página.
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         required: false
 *         default: 10
 *         description: Cantidad de resultados por página.
 *     responses:
 *       200:
 *         description: Lista de órdenes con paginación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ordenes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       fecha:
 *                         type: string
 *                         format: date-time
 *                       estado:
 *                         type: string
 *                       usuarioId:
 *                         type: string
 *                       restauranteId:
 *                         type: string
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *       400:
 *         description: Error al obtener órdenes con paginación.
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
 *                   example: No se pudieron obtener las órdenes.
 */

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { page = 1, size = 10 } = req.query;
        const ordenes = await Orden.find({})
          .limit(parseInt(size, 10))
          .skip((page - 1) * parseInt(size, 10))
          .exec();
        const count = await Orden.countDocuments({});
        
        res.status(200).json({ ordenes, totalPages: Math.ceil(count / size), currentPage: page });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, error: 'Método no permitido' });
      break;
  }
};

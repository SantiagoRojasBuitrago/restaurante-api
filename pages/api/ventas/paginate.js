import dbConnect from '../../../utils/dbConnect';
import Venta from '../../../models/Venta';

dbConnect();

/**
 * @swagger
 * /api/ventas/paginate:
 *   get:
 *     summary: Obtener ventas con paginación
 *     description: Obtiene una lista de ventas con paginación.
 *     tags: [Ventas]
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
 *         description: Lista de ventas con paginación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ventas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       fecha:
 *                         type: string
 *                         format: date-time
 *                       total:
 *                         type: number
 *                       usuarioId:
 *                         type: string
 *                       restauranteId:
 *                         type: string
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *       400:
 *         description: Error al obtener ventas con paginación.
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
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { page = 1, size = 10 } = req.query;
        const ventas = await Venta.find({})
          .limit(parseInt(size, 10))
          .skip((page - 1) * parseInt(size, 10))
          .exec();
        const count = await Venta.countDocuments({});
        
        res.status(200).json({ ventas, totalPages: Math.ceil(count / size), currentPage: page });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

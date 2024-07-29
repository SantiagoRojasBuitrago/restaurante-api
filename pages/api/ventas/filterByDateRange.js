import dbConnect from '../../../utils/dbConnect';
import Venta from '../../../models/Venta';

dbConnect();

/**
 * @swagger
 * /api/ventas/filterByDateRange:
 *   get:
 *     summary: Filtrar ventas por rangos de fecha y paginación
 *     description: Filtra las ventas entre dos fechas y permite paginar los resultados.
 *     tags: [Ventas]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *         description: Fecha de inicio del rango en formato ISO 8601.
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *         description: Fecha de fin del rango en formato ISO 8601.
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
 *         description: Lista de ventas filtradas por fecha con paginación.
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
 *         description: Error al filtrar ventas por fechas.
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
        const { startDate, endDate, page = 1, size = 10 } = req.query;
        const query = { fecha: { $gte: new Date(startDate), $lte: new Date(endDate) } };
        
        const ventas = await Venta.find(query)
          .limit(parseInt(size, 10))
          .skip((page - 1) * parseInt(size, 10))
          .exec();
        const count = await Venta.countDocuments(query);
        
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

import dbConnect from '../../../utils/dbConnect';
import Mesero from '../../../models/Mesero';

dbConnect();

/**
 * @swagger
 * /api/meseros/search:
 *   get:
 *     summary: Buscar meseros por nombre y paginación
 *     description: Busca meseros por nombre y permite paginar los resultados.
 *     tags: [Meseros]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         required: false
 *         description: Nombre del mesero a buscar (búsqueda parcial).
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
 *         description: Lista de meseros con paginación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 meseros:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       nombre:
 *                         type: string
 *                       apellido:
 *                         type: string
 *                       email:
 *                         type: string
 *                       rol:
 *                         type: string
 *                       restauranteId:
 *                         type: string
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *       400:
 *         description: Error al buscar meseros.
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
        const { nombre, page = 1, size = 10 } = req.query;
        const query = nombre ? { nombre: new RegExp(nombre, 'i') } : {};
        const meseros = await Mesero.find(query)
          .limit(parseInt(size, 10))
          .skip((page - 1) * parseInt(size, 10))
          .exec();
        const count = await Mesero.countDocuments(query);
        res.status(200).json({ meseros, totalPages: Math.ceil(count / size), currentPage: page });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

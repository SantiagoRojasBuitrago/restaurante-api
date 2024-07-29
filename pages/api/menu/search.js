import dbConnect from '../../../utils/dbConnect';
import Menu from '../../../models/menu';

dbConnect();

/**
 * @swagger
 * /api/menu/search:
 *   get:
 *     summary: Buscar elementos del menú por nombre y paginación
 *     description: Busca elementos del menú por nombre y permite paginar los resultados.
 *     tags: [Menu]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         required: false
 *         description: Nombre del elemento del menú a buscar (búsqueda parcial).
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
 *         description: Lista de elementos del menú con paginación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 menuItems:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       nombre:
 *                         type: string
 *                       descripcion:
 *                         type: string
 *                       precio:
 *                         type: number
 *                       categoriaId:
 *                         type: string
 *                       restauranteId:
 *                         type: string
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *       400:
 *         description: Error al buscar elementos del menú.
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
        const menuItems = await Menu.find(query)
          .limit(parseInt(size, 10))
          .skip((page - 1) * parseInt(size, 10))
          .exec();
        const count = await Menu.countDocuments(query);
        res.status(200).json({ menuItems, totalPages: Math.ceil(count / size), currentPage: page });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

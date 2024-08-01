import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import corsMiddleware from '../../../utils/corsMiddleware';

/**
 * @swagger
 * /api/meseros/search:
 *   get:
 *     summary: Buscar usuarios con rol de mesero por nombre y paginación
 *     description: Busca usuarios con rol de "waiter" por nombre y permite paginar los resultados.
 *     tags: [Meseros]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         required: false
 *         description: Nombre del usuario a buscar (búsqueda parcial).
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
 *         description: Lista de usuarios con rol de "waiter" y paginación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       email:
 *                         type: string
 *                       roles:
 *                         type: array
 *                         items:
 *                           type: string
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *       400:
 *         description: Error al buscar usuarios.
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

  switch (method) {
    case 'GET':
      try {
        const { nombre, page = 1, size = 10 } = req.query;
        const query = {
          roles: 'waiter',
          ...(nombre ? { email: new RegExp(nombre, 'i') } : {})
        };
        const users = await User.find(query)
          .limit(parseInt(size, 10))
          .skip((page - 1) * parseInt(size, 10))
          .exec();
        const count = await User.countDocuments(query);
        res.status(200).json({ users, totalPages: Math.ceil(count / size), currentPage: page });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

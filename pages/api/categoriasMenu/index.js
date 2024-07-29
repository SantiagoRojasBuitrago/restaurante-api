import dbConnect from '../../../utils/dbConnect';
import CategoriaMenu from '../../../models/CategoriaMenu';


/**
 * @swagger
 * /api/categoriaMenu:
 *   get:
 *     summary: Obtiene todas las categorías de menú
 *     tags: [CategoriaMenu]
 *     responses:
 *       200:
 *         description: Lista de todas las categorías de menú
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CategoriaMenu'
 *       400:
 *         description: Error de solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *   post:
 *     summary: Crea una nueva categoría de menú
 *     tags: [CategoriaMenu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoriaMenu'
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/CategoriaMenu'
 *       400:
 *         description: Error de solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */


export default async (req, res) => {
  // Asegurarse de que la conexión a la base de datos esté establecida
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const categorias = await CategoriaMenu.find({});
        res.status(200).json({ success: true, data: categorias });
      } catch (error) {
        console.error('Error en GET:', error);
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'POST':
      try {
        const categoria = await CategoriaMenu.create(req.body);
        res.status(201).json({ success: true, data: categoria });
      } catch (error) {
        console.error('Error en POST:', error);
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

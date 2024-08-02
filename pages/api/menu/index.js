import dbConnect from '../../../utils/dbConnect';
import Menu from '../../../models/Menu';
import corsMiddleware from '../../../utils/corsMiddleware';




/**
 * @swagger
 * /api/menus:
 *   get:
 *     summary: Obtener todos los ítems del menú
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: Lista de ítems del menú obtenida exitosamente
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
 *                     $ref: '#/components/schemas/Menu'
 *       400:
 *         description: Error en la solicitud
 *   post:
 *     summary: Crear un nuevo ítem del menú
 *     tags: [Menu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Menu'
 *     responses:
 *       201:
 *         description: Ítem del menú creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Menu'
 *       400:
 *         description: Error en la solicitud
 * components:
 *   schemas:
 *     Menu:
 *       type: object
 *       required:
 *         - nombre
 *         - ingredientes
 *         - precio
 *         - estado
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado del ítem
 *         nombre:
 *           type: string
 *           description: Nombre del ítem
 *         ingredientes:
 *           type: array
 *           items:
 *             type: string
 *           description: Ingredientes del ítem
 *         precio:
 *           type: number
 *           description: Precio del ítem
 *         estado:
 *           type: string
 *           description: Estado del ítem (Enabled o Disabled)
 *           enum: [Enabled, Disabled]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 */

export default async (req, res) => {
  await corsMiddleware(req, res);
  await dbConnect();
  
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const menu = await Menu.find({});
        res.status(200).json({ success: true, data: menu });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const item = await Menu.create(req.body);
        res.status(201).json({ success: true, data: item });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

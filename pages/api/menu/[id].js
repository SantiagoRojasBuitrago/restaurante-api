import dbConnect from '../../../utils/dbConnect';
import corsMiddleware from '../../../utils/corsMiddleware';
import Menu from '../../../models/Menu';



/**
 * @swagger
 * /api/menus/{id}:
 *   get:
 *     summary: Obtener un ítem del menú por ID
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del ítem del menú
 *     responses:
 *       200:
 *         description: Ítem del menú obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/Menu'
 *       404:
 *         description: Ítem no encontrado
 *       400:
 *         description: Error en la solicitud
 *   put:
 *     summary: Actualizar un ítem del menú
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del ítem del menú
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Menu'
 *     responses:
 *       200:
 *         description: Ítem actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Menu'
 *       404:
 *         description: Ítem no encontrado
 *       400:
 *         description: Error en la solicitud
 *   delete:
 *     summary: Eliminar un ítem del menú
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del ítem del menú
 *     responses:
 *       200:
 *         description: Ítem eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   additionalProperties: false
 *       404:
 *         description: Ítem no encontrado
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

  const { query: { id }, method } = req;

  switch (method) {
    case 'GET':
      try {
        const item = await Menu.findById(id);
        if (!item) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: item });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const item = await Menu.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!item) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: item });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedItem = await Menu.deleteOne({ _id: id });
        if (!deletedItem) {
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

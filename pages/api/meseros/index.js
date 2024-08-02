import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import { hashPassword } from '../../../utils/auth';
import corsMiddleware from '../../../utils/corsMiddleware';

/**
 * @swagger
 * tags:
 *   name: Meseros
 *   description: Operaciones relacionadas con los meseros.
 */

/**
 * @swagger
 * /api/meseros/:
 *   get:
 *     summary: Obtener todos los meseros con paginación
 *     description: Obtiene todos los usuarios con rol de "waiter" y permite paginar los resultados.
 *     tags: [Meseros]
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
 *                         description: ID del mesero.
 *                       nombre:
 *                         type: string
 *                         description: Nombre del mesero.
 *                       apellido:
 *                         type: string
 *                         description: Apellido del mesero.
 *                       telefono:
 *                         type: string
 *                         description: Teléfono del mesero.
 *                       numeroIdentidad:
 *                         type: string
 *                         description: Número de cédula del mesero.
 *                       email:
 *                         type: string
 *                         description: Email del mesero.
 *                       password:
 *                         type: string
 *                         description: Contraseña del mesero.
 *                 totalPages:
 *                   type: integer
 *                   description: Número total de páginas.
 *                 currentPage:
 *                   type: integer
 *                   description: Página actual.
 *       400:
 *         description: Error al obtener los meseros.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *                   description: Mensaje de error.
 *   post:
 *     summary: Crear un nuevo mesero
 *     description: Crea un nuevo usuario con rol de "waiter" con los datos proporcionados.
 *     tags: [Meseros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del mesero.
 *               apellido:
 *                 type: string
 *                 description: Apellido del mesero.
 *               telefono:
 *                 type: string
 *                 description: Teléfono del mesero.
 *               numeroIdentidad:
 *                 type: string
 *                 description: Número de cédula del mesero.
 *               email:
 *                 type: string
 *                 description: Email del mesero.
 *               password:
 *                 type: string
 *                 description: Contraseña del mesero.
 *             required:
 *               - nombre
 *               - apellido
 *               - telefono
 *               - numeroIdentidad
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Mesero creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: ID del mesero creado.
 *                     nombre:
 *                       type: string
 *                       description: Nombre del mesero.
 *                     apellido:
 *                       type: string
 *                       description: Apellido del mesero.
 *                     telefono:
 *                       type: string
 *                       description: Teléfono del mesero.
 *                     numeroIdentidad:
 *                       type: string
 *                       description: Número de cédula del mesero.
 *                     email:
 *                       type: string
 *                       description: Email del mesero.
 *                     password:
 *                       type: string
 *                       description: Contraseña del mesero.
 *       400:
 *         description: Error al crear el mesero.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *                   description: Mensaje de error.
 */

export default async (req, res) => {
  await corsMiddleware(req, res); 
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { page = 1, size = 10 } = req.query;
        const meseros = await User.find({ roles: 'waiter' })
          .limit(parseInt(size, 10))
          .skip((page - 1) * parseInt(size, 10))
          .exec();
        const count = await User.countDocuments({ roles: 'waiter' });
        res.status(200).json({ meseros, totalPages: Math.ceil(count / size), currentPage: parseInt(page, 10) });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'POST':
      try {
        const { nombre, apellido, telefono, numeroIdentidad, email, password } = req.body;

        const hashedPassword = await hashPassword(password);
        const mesero = await User.create({
          nombre,
          apellido,
          telefono,
          numeroIdentidad,
          email,
          password: hashedPassword,
          roles: ['waiter'],
          estado: 'Enabled',  // Agregamos el estado por defecto
        });

        res.status(201).json({ success: true, data: mesero });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};


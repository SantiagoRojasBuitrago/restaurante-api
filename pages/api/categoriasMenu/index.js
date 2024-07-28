import dbConnect from '../../../utils/dbConnect';
import CategoriaMenu from '../../../models/CategoriaMenu';

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

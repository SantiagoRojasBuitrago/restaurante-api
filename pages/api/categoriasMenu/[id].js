import dbConnect from '../../../utils/dbConnect';
import CategoriaMenu from '../../../models/CategoriaMenu';

dbConnect();

export default async (req, res) => {
  const { query: { id }, method } = req;

  switch (method) {
    case 'GET':
      try {
        const categoria = await CategoriaMenu.findById(id);
        if (!categoria) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: categoria });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const categoria = await CategoriaMenu.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!categoria) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: categoria });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedCategoria = await CategoriaMenu.deleteOne({ _id: id });
        if (!deletedCategoria) {
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

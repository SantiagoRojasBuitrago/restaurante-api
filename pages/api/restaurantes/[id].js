import dbConnect from '../../../utils/dbConnect';
import Restaurante from '../../../models/Restaurante';

dbConnect();

export default async (req, res) => {
  const { query: { id }, method } = req;

  switch (method) {
    case 'GET':
      try {
        const restaurante = await Restaurante.findById(id);
        if (!restaurante) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: restaurante });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const restaurante = await Restaurante.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!restaurante) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: restaurante });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedRestaurante = await Restaurante.deleteOne({ _id: id });
        if (!deletedRestaurante) {
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

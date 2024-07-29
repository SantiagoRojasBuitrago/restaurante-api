import dbConnect from '../../../utils/dbConnect';
import Orden from '../../../models/Orden';

dbConnect();

export default async (req, res) => {
  const { query: { id }, method } = req;

  switch (method) {
    case 'GET':
      try {
        const orden = await Orden.findById(id);
        if (!orden) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: orden });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const orden = await Orden.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!orden) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: orden });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedOrden = await Orden.deleteOne({ _id: id });
        if (!deletedOrden) {
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

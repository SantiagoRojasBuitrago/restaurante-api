import dbConnect from '../../../utils/dbConnect';
import Venta from '../../../models/Venta';

dbConnect();

export default async (req, res) => {
  const { query: { id }, method } = req;

  switch (method) {
    case 'GET':
      try {
        const venta = await Venta.findById(id);
        if (!venta) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: venta });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const venta = await Venta.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!venta) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: venta });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedVenta = await Venta.deleteOne({ _id: id });
        if (!deletedVenta) {
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

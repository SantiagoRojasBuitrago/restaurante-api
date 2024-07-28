import dbConnect from '../../utils/dbConnect';
import DetalleOrden from '../../models/DetalleOrden';

dbConnect();

export default async (req, res) => {
  const { query: { id }, method } = req;

  switch (method) {
    case 'GET':
      try {
        const detalle = await DetalleOrden.findById(id);
        if (!detalle) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: detalle });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const detalle = await DetalleOrden.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!detalle) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: detalle });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedDetalle = await DetalleOrden.deleteOne({ _id: id });
        if (!deletedDetalle) {
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

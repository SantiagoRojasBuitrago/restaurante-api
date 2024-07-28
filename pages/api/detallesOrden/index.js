import dbConnect from '../../../utils/dbConnect';
import DetalleOrden from '../../../models/DetalleOrden';


dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const detalles = await DetalleOrden.find({});
        res.status(200).json({ success: true, data: detalles });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const detalle = await DetalleOrden.create(req.body);
        res.status(201).json({ success: true, data: detalle });
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

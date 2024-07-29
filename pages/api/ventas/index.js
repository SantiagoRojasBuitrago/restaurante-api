import dbConnect from '../../../utils/dbConnect';
import Venta from '../../../models/Venta';

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const ventas = await Venta.find({});
        res.status(200).json({ success: true, data: ventas });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const venta = await Venta.create(req.body);
        res.status(201).json({ success: true, data: venta });
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

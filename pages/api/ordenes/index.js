import dbConnect from '../../../utils/dbConnect';
import Orden from '../../../models/Orden';

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const ordenes = await Orden.find({});
        res.status(200).json({ success: true, data: ordenes });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const orden = await Orden.create(req.body);
        res.status(201).json({ success: true, data: orden });
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

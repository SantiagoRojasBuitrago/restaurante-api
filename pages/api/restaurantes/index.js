import dbConnect from '../../../utils/dbConnect';
import Restaurante from '../../../models/Restaurante';

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const restaurantes = await Restaurante.find({});
        res.status(200).json({ success: true, data: restaurantes });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const restaurante = await Restaurante.create(req.body);
        res.status(201).json({ success: true, data: restaurante });
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

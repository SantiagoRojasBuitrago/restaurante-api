import dbConnect from '../../../utils/dbConnect';
import UsoInsumo from '../../../models/UsoInsumo';

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const usos = await UsoInsumo.find({});
        res.status(200).json({ success: true, data: usos });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const uso = await UsoInsumo.create(req.body);
        res.status(201).json({ success: true, data: uso });
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

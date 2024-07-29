import dbConnect from '../../../utils/dbConnect';
import UsoInsumo from '../../../models/UsoInsumo';

dbConnect();

export default async (req, res) => {
  const { query: { id }, method } = req;

  switch (method) {
    case 'GET':
      try {
        const uso = await UsoInsumo.findById(id);
        if (!uso) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: uso });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const uso = await UsoInsumo.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!uso) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: uso });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedUso = await UsoInsumo.deleteOne({ _id: id });
        if (!deletedUso) {
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

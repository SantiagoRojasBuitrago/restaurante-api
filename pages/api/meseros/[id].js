import dbConnect from '../../../utils/dbConnect';
import Mesero from '../../../models/Mesero';

dbConnect();

export default async (req, res) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const mesero = await Mesero.findById(id);
        if (!mesero) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: mesero });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const mesero = await Mesero.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!mesero) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: mesero });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedMesero = await Mesero.deleteOne({ _id: id });
        if (!deletedMesero) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

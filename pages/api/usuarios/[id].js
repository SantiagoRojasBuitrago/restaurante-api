import dbConnect from '../../../utils/dbConnect';
import Usuario from '../../../models/Usuario';

dbConnect();

export default async (req, res) => {
  const { query: { id }, method } = req;

  switch (method) {
    case 'GET':
      try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: usuario });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const usuario = await Usuario.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!usuario) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: usuario });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedUsuario = await Usuario.deleteOne({ _id: id });
        if (!deletedUsuario) {
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

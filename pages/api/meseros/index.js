import dbConnect from '../../../utils/dbConnect';
import Mesero from '../../../models/Mesero';

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { nombre, page = 1, size = 10 } = req.query;
        const query = nombre ? { nombre: new RegExp(nombre, 'i') } : {};
        const meseros = await Mesero.find(query)
          .limit(size * 1)
          .skip((page - 1) * size)
          .exec();
        const count = await Mesero.countDocuments(query);
        res.status(200).json({ meseros, totalPages: Math.ceil(count / size), currentPage: page });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const mesero = await Mesero.create(req.body);
        res.status(201).json({ success: true, data: mesero });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

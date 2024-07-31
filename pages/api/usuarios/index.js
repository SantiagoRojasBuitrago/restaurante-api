// Controllers/index.js

import dbConnect from '../../../utils/dbConnect';
import Usuario from '../../../models/Usuario';

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const usuarios = await Usuario.find({});
        res.status(200).json({ success: true, data: usuarios });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const { email, password, roles } = req.body;
        const usuario = await Usuario.create({ email, password, roles });
        res.status(201).json({ success: true, data: usuario });
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

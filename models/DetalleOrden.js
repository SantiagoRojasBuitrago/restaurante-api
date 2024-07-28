import mongoose from 'mongoose';

const DetalleOrdenSchema = new mongoose.Schema({
  ordenID: { type: mongoose.Schema.Types.ObjectId, ref: 'Orden', required: true },
  menuID: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true },
});

export default mongoose.models.DetalleOrden || mongoose.model('DetalleOrden', DetalleOrdenSchema);

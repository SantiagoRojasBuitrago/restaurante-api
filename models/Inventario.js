import mongoose from 'mongoose';

const InventarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true },
  unidad: { type: String, required: true },
  restauranteID: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurante', required: true },
});

export default mongoose.models.Inventario || mongoose.model('Inventario', InventarioSchema);

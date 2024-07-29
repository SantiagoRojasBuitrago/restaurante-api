import mongoose from 'mongoose';

const VentaSchema = new mongoose.Schema({
  fecha: { type: Date, default: Date.now, required: true },
  total: { type: Number, required: true },
  usuarioID: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  restauranteID: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurante', required: true },
  meseroID: { type: mongoose.Schema.Types.ObjectId, ref: 'Mesero', required: true }, // Agregado
}, {
  timestamps: true
});

export default mongoose.models.Venta || mongoose.model('Venta', VentaSchema);

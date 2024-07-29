import mongoose from 'mongoose';

const OrdenSchema = new mongoose.Schema({
  fecha: { type: Date, default: Date.now, required: true },
  usuarioID: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  restauranteID: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurante', required: true },
  estado: { type: String, required: true, enum: ['pendiente', 'en preparación', 'listo para servir', 'servido', 'cancelado', 'confirmado'] }, // Agregado
}, {
  timestamps: true
});

export default mongoose.models.Orden || mongoose.model('Orden', OrdenSchema);

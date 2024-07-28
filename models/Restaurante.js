import mongoose from 'mongoose';

const RestauranteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  telefono: { type: String, required: true },
});

export default mongoose.models.Restaurante || mongoose.model('Restaurante', RestauranteSchema);

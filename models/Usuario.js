import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  rol: { type: String, required: true },
  restauranteID: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurante', required: true },
});

export default mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);

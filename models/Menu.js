import mongoose from 'mongoose';

const MenuSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  categoriaID: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoriaMenu', required: true },
  restauranteID: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurante', required: true },
}, {
  timestamps: true
});

export default mongoose.models.Menu || mongoose.model('Menu', MenuSchema);

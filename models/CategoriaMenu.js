import mongoose from 'mongoose';

const CategoriaMenuSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
});

export default mongoose.models.CategoriaMenu || mongoose.model('CategoriaMenu', CategoriaMenuSchema);

import mongoose from 'mongoose';

const MenuSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ingredientes: { type: [String], required: true },
  precio: { type: Number, required: true },
  estado: {
    type: String,
    enum: ['Enabled', 'Disabled'],
    default: 'Enabled',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Menu || mongoose.model('Menu', MenuSchema);

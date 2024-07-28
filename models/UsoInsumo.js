import mongoose from 'mongoose';

const UsoInsumoSchema = new mongoose.Schema({
  menuID: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
  productoID: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventario', required: true },
  cantidadUsada: { type: Number, required: true },
});

export default mongoose.models.UsoInsumo || mongoose.model('UsoInsumo', UsoInsumoSchema);

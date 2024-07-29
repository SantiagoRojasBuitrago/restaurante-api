const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeseroSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  telefono: {
    type: String,
    required: true
  },
  restauranteId: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurante',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.Mesero || mongoose.model('Mesero', MeseroSchema);

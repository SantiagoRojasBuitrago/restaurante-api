import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  roles: {
    type: [String],  // Array de strings para los roles
    default: ['user'],  // Rol por defecto
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  apellido: {
    type: String,
    required: true,
    trim: true,
  },
  telefono: {
    type: String,
    required: true,
    trim: true,
  },
  numeroIdentidad: {
    type: String,
    required: true,
    trim: true,
    unique: true,  // Asegura que el número de identidad sea único
  },
  estado: {
    type: String,
    enum: ['Enabled', 'Disabled'],  // Solo permite estos valores
    default: 'Enabled',  // Valor por defecto
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);

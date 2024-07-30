// models/User.js

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
});

export default mongoose.models.User || mongoose.model('User', UserSchema);

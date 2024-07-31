import { verifyToken } from './auth';
import corsMiddleware from './corsMiddleware'; // Asegúrate de que la ruta sea correcta

export const authenticate = (handler) => async (req, res) => {
  // Ejecuta el middleware CORS antes de manejar la solicitud
  await corsMiddleware(req, res);

  // Autenticación
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  req.user = decoded;
  return handler(req, res);
};

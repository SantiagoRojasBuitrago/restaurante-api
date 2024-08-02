import Cors from 'cors';

// Inicializa el middleware CORS
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  origin: '*', // Permite solicitudes desde cualquier origen, ajusta según sea necesario
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Permite el encabezado Content-Type
});

function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

const corsMiddleware = initMiddleware(cors);

export default corsMiddleware;

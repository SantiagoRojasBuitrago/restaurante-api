import Cors from 'cors';

// Inicializa el middleware CORS
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  origin: 'http://localhost:3000', // o el dominio de tu frontend en producción/ Permite solicitudes desde cualquier origen, ajusta según sea necesario
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


// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
  },
  apis: ['./pages/api/**/*.js'], // Archivos a documentar
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

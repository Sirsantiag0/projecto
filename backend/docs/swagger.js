const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentación con Swagger",
      version: "1.0.0",
      description: "Documentación de una API Express usando Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000", // tu servidor local
        description: "Servidor de desarrollo",
      },
    ],
  },
  apis: ["./routes/*.js"], // <--- Importante, aquí Swagger buscará anotaciones
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

// swagger.ts
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    info: {
      title: "My Express API",
      version: "1.0.0",
      description: "API documentation for my Express API",
    },
  },
  apis: ["./src/routes/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);

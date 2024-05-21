// swagger.ts
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My Express API",
      version: "1.0.0",
      description: "API documentation for my Express API",
    },
  },
  apis: ["./src/routes/**/*.ts", "./src/schemas/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);

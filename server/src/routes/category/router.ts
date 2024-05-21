import categoryController from "@/controllers/category";
import express from "express";

const categoryRouter = express();

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: The Category managing API
 * /category/featured:
 *   get:
 *     tags: [Category]
 *     summary: Get a list of 5 tag suggestions based on search query
 *     description: Uses strapi's findMany of the Tag's content type
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             description: An array of categories.
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Category'
 */
categoryRouter.get("/featured", categoryController.getFeatured);

export default categoryRouter;

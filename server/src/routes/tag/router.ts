import tagController from "@/controllers/tag";
import express from "express";

const tagRouter = express();

/**
 * @swagger
 * tags:
 *   name: Tag
 *   description: The Tag managing API
 * /tag/filters/{query?}:
 *   get:
 *     tags: [Tag]
 *     parameters:
 *       - in: path
 *         name: query
 *         type: string
 *         description: User text query
 *         example: "my tag"
 *     summary: Get a list of 5 tag suggestions based on search query
 *     description: Uses strapi's findMany of the Tag's content type
 *     responses:
 *       '200':
 *         description: A single user.
 *         schema:
 *           $ref: '#/definitions/Tag'
 */
tagRouter.get("/filters/:query?", tagController.findInFilters);

tagRouter.post("/filters", tagController.findInFilters);

export default tagRouter;

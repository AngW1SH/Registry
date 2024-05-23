import userRoleController from "@/controllers/user-role";
import express from "express";

const userRoleRouter = express.Router();
/**
 * @swagger
 * tags:
 *   name: User Role
 *   description: The User Role managing API
 * /user/role/{query}:
 *   get:
 *     tags: [User Role]
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         type: string
 *         required: true
 *         description: Should contain user JWT-token
 *       - in: path
 *         name: query
 *         type: string
 *         required: true
 *         description: Search query
 *         example: "Fronte"
 *     summary: Get a list of user roles based on search query
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             description: An array of role names.
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "Frontend-разработчик"
 */
userRoleRouter.get("/:query", userRoleController.findInFilters);

/**
 * @swagger
 * /user/role/:
 *   post:
 *     tags: [User Role]
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         type: string
 *         required: true
 *         description: Should contain user JWT-token
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             query:
 *               type: string
 *               example: "Fronte"
 *               description: Search query
 *     summary: Get a list of user roles based on search query
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             description: An array of role names.
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "Frontend-разработчик"
 */
userRoleRouter.post("/", userRoleController.findInFilters);

/**
 * @swagger
 * /user/role:
 *   get:
 *     tags: [User Role]
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         type: string
 *         required: true
 *         description: Should contain user JWT-token
 *     summary: Get a list of user roles based on search query
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             description: An array of role names.
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "Frontend-разработчик"
 */
userRoleRouter.get("/", userRoleController.findInFilters);

export default userRoleRouter;

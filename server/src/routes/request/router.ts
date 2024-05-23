import projectController from "@/controllers/project";
import express, { Request, Response } from "express";
import passport from "@/middleware/passport";
import requestController from "@/controllers/request";

const requestRouter = express();

/**
 * @swagger
 * tags:
 *   name: Request
 *   description: The Request managing API
 * /request/:
 *   post:
 *     tags: [Request]
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         type: string
 *         required: true
 *         description: Should contain user JWT-token
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               project:
 *                 type: string
 *                 description: Project slug
 *                 example: "project-name"
 *               team:
 *                 type: number
 *                 description: Team id
 *                 example: 25
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     summary: Create a new request
 *     description: Has server-side checks whether the user can make a request
 *     responses:
 *       '200':
 *         description: Request created
 */
requestRouter.post(
  "/",
  passport.authenticate("jwt-authenticate"),
  requestController.add
);

/**
 * @swagger
 * /request/:
 *   put:
 *     tags: [Request]
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         type: string
 *         required: true
 *         description: Should contain user JWT-token
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               request:
 *                 type: number
 *                 description: Request id
 *                 example: 40
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     summary: Edit request files
 *     description: Has server-side checks whether the user can make a request
 *     responses:
 *       '200':
 *         description: Request edited
 */
requestRouter.put(
  "/",
  passport.authenticate("jwt-authenticate"),
  requestController.edit
);

/**
 * @swagger
 * /request/available:
 *   get:
 *     tags: [Request]
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         type: string
 *         required: true
 *         description: Should contain user JWT-token
 *     summary: Get info about requests that the user can make
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 teams:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         description: Team id
 *                         example: 25
 *                       name:
 *                         type: string
 *                         description: Team name
 *                         example: "Иванов И.И., Петров П.П."
 *                       projects:
 *                         type: array
 *                         description: An array of projects that the user can apply the team to.
 *                         items:
 *                           type: string
 *                           description: Project slug
 *                           example: "project-name"
 *                 projectReferences:
 *                   type: array
 *                   description: An array of compact project data
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Project slug
 *                         example: "project-name"
 *                       name:
 *                         type: string
 *                         description: Project name
 *                         example: "Project Name"
 */
requestRouter.get(
  "/available",
  passport.authenticate("jwt-authenticate"),
  requestController.getAvailable
);

/**
 * @swagger
 * /request/{id}:
 *   delete:
 *     tags: [Request]
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         type: string
 *         required: true
 *         description: Should contain user JWT-token
 *       - in: path
 *         name: id
 *         required: true
 *         type: number
 *         description: Request id
 *         example: 50
 *     summary: Delete request files
 *     description: Has server-side checks whether the user has the rights to delete the request
 *     responses:
 *       '200':
 *         description: Request deleted
 */
requestRouter.delete(
  "/:id",
  passport.authenticate("jwt-authenticate"),
  requestController.deleteOne
);

export default requestRouter;

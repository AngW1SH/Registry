import express from "express";
import projectFileTypeController from "@/controllers/project-file-type";

const projectFileTypeRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Project File Type
 *   description: The Project File Type managing API
 * /project/file-type/:
 *   get:
 *     summary: Get a list of all available file types
 *     tags: [Project File Type]
 *     responses:
 *       200:
 *         description: available file types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/ProjectFileType'
 */
projectFileTypeRouter.get("/", projectFileTypeController.findAll);

/**
 * @swagger
 * /project/file-type/{id}:
 *   get:
 *     summary: Get project file type data by id
 *     description: Currently not used anywhere
 *     parameters:
 *       - in: path
 *         name: id
 *         type:
 *           $oneOf:
 *             - type: string
 *             - type: number
 *         description: Project file type id
 *         example: 35
 *     tags: [Project File Type]
 *     responses:
 *       200:
 *         description: file type data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ProjectFileType'
 */
projectFileTypeRouter.get("/:id", projectFileTypeController.findOne);

export default projectFileTypeRouter;

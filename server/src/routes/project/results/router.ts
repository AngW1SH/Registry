import express from "express";
import passport from "@/middleware/passport";
import projectResultsController from "@/controllers/project-results";

const projectResultsRouter = express.Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   name: Project File
 *   description: The Project File managing API
 * /project/{id}/result-files/{fileid}:
 *   put:
 *     summary: change attached file
 *     tags: [Project File]
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         type: string
 *         description: Should contain user JWT-token
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Project id
 *       - in: path
 *         name: fileid
 *         required: true
 *         type: string
 *         description: File id
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: file changed
 */
projectResultsRouter.put(
  "/:fileid",
  passport.authenticate("jwt-authenticate"),
  projectResultsController.changeFile
);

/**
 * @swagger
 * tags:
 *   name: Project File
 *   description: The Project File managing API
 * /project/{id}/result-files/{fileid}:
 *   delete:
 *     summary: delete file
 *     tags: [Project File]
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         type: string
 *         description: Should contain user JWT-token
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Project id
 *       - in: path
 *         name: fileid
 *         required: true
 *         type: string
 *         description: File id
 *     responses:
 *       200:
 *         description: file deleted
 */
projectResultsRouter.delete(
  "/:fileid",
  passport.authenticate("jwt-authenticate"),
  projectResultsController.deleteFile
);

/**
 * @swagger
 * tags:
 *   name: Project File
 *   description: The Project File managing API
 * /project/{id}/result-files:
 *   post:
 *     summary: create new file
 *     tags: [Project File]
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         type: string
 *         description: Should contain user JWT-token
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Project id
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: file type id
 *                 example: 35
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: file created
 */
projectResultsRouter.post(
  "/",
  passport.authenticate("jwt-authenticate"),
  projectResultsController.uploadFile
);

export default projectResultsRouter;

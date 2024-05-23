import express from "express";
import passport from "@/middleware/passport";
import projectLinksController from "@/controllers/project-links";

const projectLinksRouter = express.Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   name: Project Link
 *   description: The Project Link managing API
 * /project/{id}/link/:
 *   post:
 *     summary: add a new project link
 *     tags: [Project Link]
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
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             platform:
 *               type: string
 *               example: "Github"
 *               description: Options are defined in strapi. TODO - fetch options from strapi (just like with file-types). As of now, the only option 'GitHub' is hardcoded.
 *             link:
 *               type: string
 *               example: "https://github.com/org/repo"
 *               description: Link to the project
 *     responses:
 *       200:
 *         description: link added
 */
projectLinksRouter.post(
  "/",
  passport.authenticate("jwt-authenticate"),
  projectLinksController.addLink
);

/**
 * @swagger
 * tags:
 *   name: Project Link
 *   description: The Project Link managing API
 * /project/{id}/link/{linkid}:
 *   delete:
 *     summary: delete a project link
 *     tags: [Project Link]
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
 *         name: linkid
 *         required: true
 *         type: string
 *         description: Project link id
 *     responses:
 *       200:
 *         description: link deleted
 */
projectLinksRouter.delete(
  "/:linkid",
  passport.authenticate("jwt-authenticate"),
  projectLinksController.deleteLink
);

export default projectLinksRouter;

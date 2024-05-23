import express from "express";
import passport from "@/middleware/passport";
import memberController from "@/controllers/member";

const memberRouter = express();
/**
 * @swagger
 * tags:
 *   name: Member
 *   description: The Member managing API
 * /member/:
 *   put:
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         type: string
 *         required: true
 *         description: Should contain user JWT-token
 *     tags: [Member]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               member:
 *                 $ref: '#/definitions/Member'
 *     summary: Edit member role list
 *     responses:
 *       '200':
 *         description: Member updated
 */
memberRouter.put(
  "/",
  passport.authenticate("jwt-authenticate"),
  memberController.edit
);

export default memberRouter;

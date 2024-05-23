import express from "express";
import passport from "@/middleware/passport";
import profileController from "@/controllers/profile";

const profileRouter = express();

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: The Profile managing API
 * /profile/account:
 *   put:
 *     tags: [Profile]
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         type: string
 *         required: true
 *         description: Should contain user JWT-token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "st123456@student.spbu.ru"
 *                 description: Email
 *               phone:
 *                 type: string
 *                 example: "+7 999 999 99 99"
 *                 description: Phone
 *     summary: Edit member role list
 *     responses:
 *       '200':
 *         description: Account data
 */
profileRouter.put(
  "/account",
  passport.authenticate("jwt-authenticate"),
  profileController.editAccountData
);

/**
 * @swagger
 * /profile/personal:
 *   put:
 *     tags: [Profile]
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         type: string
 *         required: true
 *         description: Should contain user JWT-token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John"
 *                 description: Name
 *               surname:
 *                 type: string
 *                 example: "Doe"
 *                 description: Surname
 *               patronymic:
 *                 type: string
 *                 example: "Ivanovich"
 *                 description: Patronymic
 *     summary: Edit member role list
 *     responses:
 *       '200':
 *         description: Personal data
 */
profileRouter.put(
  "/personal",
  passport.authenticate("jwt-authenticate"),
  profileController.editPersonalData
);

export default profileRouter;

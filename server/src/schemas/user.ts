/**
 * @swagger
 * definitions:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - email
 *         - phone
 *       properties:
 *         id:
 *           type: number
 *           description: Strapi id (auto-incremented)
 *           example: 30
 *         name:
 *           type: string
 *           description: Displayed in the client
 *           example: "Иванов Иван Иванович"
 *         email:
 *           type: string
 *           description: Email
 *           example: "st123456@student.spbu.ru"
 *         phone:
 *           type: string
 *           description: Phone number
 *           example: "+7 999 999 99 99"
 */

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
 *     UserProfile:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - phone
 *         - teams
 *         - administratedTeams
 *         - projects
 *       properties:
 *         fullName:
 *           type: object
 *           required:
 *             - name
 *             - surname
 *             - patronymic
 *           properties:
 *             name:
 *               type: string
 *               description: Displayed in the client
 *               example: "Иван"
 *             surname:
 *               type: string
 *               description: Displayed in the client
 *               example: "Иванов"
 *             patronymic:
 *               type: string
 *               description: Displayed in the client
 *               example: "Иванович"
 *         email:
 *           type: string
 *           description: Email
 *           example: "st123456@student.spbu.ru"
 *         phone:
 *           type: string
 *           description: Phone number
 *           example: "+7 999 999 99 99"
 *         teams:
 *           type: array
 *           items:
 *             type: number
 *             description: Id of the team
 *             example: 25
 *         administratedTeams:
 *           type: array
 *           items:
 *             type: number
 *             description: Id of the team
 *             example: 25
 *         projects:
 *           type: array
 *           items:
 *             type: string
 *             description: project slug
 *             example: "project-name"
 */

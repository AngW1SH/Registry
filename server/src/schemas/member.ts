/**
 * @swagger
 * definitions:
 *     Member:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - roles
 *         - isAdministrator
 *         - team
 *         - user
 *       properties:
 *         id:
 *           type: number
 *           description: Strapi id (auto-incremented)
 *           example: 20
 *         name:
 *           type: string
 *           description: Not really used anywhere
 *           example: "Иванов Иван Иванович - Frontend-разработчик"
 *         roles:
 *           type: array
 *           description: Options are defined in strapi
 *           items:
 *             type: string
 *             example: "Frontend-разработчик"
 *         isAdministrator:
 *           type: boolean
 *           description: Is the member an administrator
 *           example: true
 *         team:
 *           type: number
 *           description: Team ID
 *           example: 25
 *         user:
 *           type: number
 *           description: User ID
 *           example: 30
 */

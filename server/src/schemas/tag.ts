/**
 * @swagger
 * definitions:
 *     Tag:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: number
 *           description: Strapi id (auto-incremented)
 *           example: 20
 *         name:
 *           type: string
 *           description: Displayed in the client
 *         projectCount:
 *           type: number
 *           description: Number of projects (only used in the 'category' route)
 *       example:
 *         id: 12
 *         name: Frontend-разработка
 */

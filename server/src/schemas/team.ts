/**
 * @swagger
 * definitions:
 *     Team:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - members
 *       properties:
 *         id:
 *           type: number
 *           description: Strapi id (auto-incremented)
 *           example: 25
 *         name:
 *           type: string
 *           description: Used when the team administrator chooses between his teams
 *           example: "Иванов И.И., Петров П.П. - Название проекта"
 *         members:
 *           type: array
 *           description: Member IDs
 *           items:
 *             type: number
 *             example: 20
 *         project:
 *           type: string
 *           description: Project ID (slug from strapi)
 *           example: "project-name"
 *         requests:
 *           type: array
 *           deprecated: true
 *           items:
 *             type: number
 */

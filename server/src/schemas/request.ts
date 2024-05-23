/**
 * @swagger
 * definitions:
 *     Request:
 *       type: object
 *       required:
 *         - id
 *         - team
 *         - project
 *         - files
 *       properties:
 *         id:
 *           type: number
 *           description: Strapi id (auto-incremented)
 *           example: 50
 *         team:
 *           type: number
 *           description: Team id
 *           example: 25
 *         project:
 *           type: string
 *           description: Project ID (slug from strapi)
 *           example: "project-name"
 *         files:
 *           type: array
 *           description: File data
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: Strapi id (auto-incremented)
 *                 example: 50
 *               name:
 *                 type: string
 *                 description: File name
 *                 example: "file-name.png"
 *               url:
 *                 type: string
 *                 description: File URL
 *                 example: "https://example.com/file-name"
 *               type:
 *                 type: string
 *                 description: File type
 *                 example: "application/pdf"
 *               size:
 *                 type: string
 *                 description: File size
 *                 example: "10 MB"
 */

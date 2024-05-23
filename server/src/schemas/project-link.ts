/**
 * @swagger
 * definitions:
 *     ProjectLink:
 *       type: object
 *       required:
 *         - id
 *         - platform
 *         - link
 *       properties:
 *         id:
 *           type: number
 *           description: Strapi id (auto-incremented)
 *           example: 25
 *         platform:
 *           type: string
 *           description: Platform name (options are defined in strapi)
 *           example: "Github"
 *         link:
 *           type: string
 *           description: Link to the project
 *           example: "https://github.com/org/repo"
 */

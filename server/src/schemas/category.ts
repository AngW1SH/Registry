/**
 * @swagger
 * definitions:
 *     ImageCategory:
 *       type: object
 *       required:
 *         - type
 *         - name
 *         - link
 *         - image
 *         - projectsCount
 *       properties:
 *         type:
 *           type: string
 *           description: Can only be one value
 *           enum: ["image"]
 *           example: image
 *         name:
 *           type: string
 *           example: Frontend-разработка
 *         link:
 *           type: string
 *           description: Link to the category (now should be calculated automatically based on 'name')
 *           example: projects?tag0=Frontend%20разработка
 *           deprecated: true
 *         image:
 *           type: string
 *           example: http://example.com/strapi/.../image.png
 *         projectsCount:
 *           type: number
 *           example: 0
 *     DetailedCategory:
 *       type: object
 *       required:
 *         - type
 *         - showMore
 *         - name
 *         - link
 *         - tags
 *       properties:
 *         type:
 *           type: string
 *           description: Can only be one value
 *           enum: ["detailed"]
 *           example: detailed
 *         showMore:
 *           type: boolean
 *           example: false
 *           description: tells if there are more tags in the category (currently unused, always 'false)
 *         name:
 *           type: string
 *           description: Name of the category (arbitrary string, not a tag name)
 *           example: Frontend-разработка
 *         link:
 *           type: string
 *           description: Link to the category (now should be calculated automatically based on 'name')
 *           example: projects?tag0=Frontend%20разработка
 *           deprecated: true
 *         tags:
 *           type: array
 *           items:
 *             $ref: "#/definitions/Tag"
 *     Category:
 *       type: object
 *       oneOf:
 *         - $ref: "#/definitions/ImageCategory"
 *         - $ref: "#/definitions/DetailedCategory"
 */

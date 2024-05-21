/**
 * @swagger
 * definitions:
 *     ProjectFilters:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           description: Search text
 *           example: "Проект"
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *             description: Id of the tag
 *             example: 12
 *         dateStart:
 *           type: string
 *           description: When do we start considering the project 'active'
 *           example: 2020-01-01
 *         dateEnd:
 *           type: string
 *           description:  When do we start considering the project 'finished'
 *           example: 2020-01-01
 *         enrollmentStart:
 *           type: string
 *           description: When can we start applying requests to the project
 *           example: 2020-01-01
 *         enrollmentEnd:
 *           type: string
 *           description: When can we stop applying requests to the project
 *           example: 2020-01-01
 *         status:
 *           type: string
 *           description: Status of the project
 *           example: "Все"
 */

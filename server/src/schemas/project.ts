/**
 * @swagger
 * definitions:
 *     ProjectDocument:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - category
 *         - date
 *         - url
 *         - type
 *         - size
 *       properties:
 *         id:
 *           type: string
 *           description: Strapi id (auto-incremented)
 *           example: 20
 *         name:
 *           type: string
 *           description: Displayed in the client
 *           example: "Проект 1.pdf"
 *         category:
 *           type: string
 *           description: Name of the category (Options are defined in strapi)
 *           example: "Отчёт"
 *         date:
 *           type: string
 *           description: Date of creation
 *           example: 2020-01-01
 *         url:
 *           type: string
 *           description: Link to the document
 *           example: http://example.com/strapi/.../file.pdf
 *         type:
 *           type: string
 *           description: Type of the document (Options are defined in strapi)
 *           example: "Отчёт"
 *         size:
 *           type: string
 *           description: Size of the document
 *           example: "5Кб"
 *     Project:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - description
 *         - dateStart
 *         - dateEnd
 *         - enrollmentStart
 *         - enrollmentEnd
 *         - supervisor
 *         - curator
 *         - client
 *         - tags
 *         - teams
 *         - teamLimit
 *         - documents
 *       properties:
 *         id:
 *           type: string
 *           description: Slug from strapi
 *           example: "project-name"
 *         name:
 *           type: string
 *           description: Displayed in the client
 *           example: "Проект 1"
 *         description:
 *           type: string
 *           description: Text description
 *           example: "Описание проекта"
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
 *         supervisor:
 *           type: string
 *           description: Name of the supervisor
 *           example: "Иванов Иван Иванович"
 *         curator:
 *           type: string
 *           description: Name of the curator
 *           example: "Петров Петр Петрович"
 *         client:
 *           type: string
 *           description: Name of the client
 *           example: "ООО Компания"
 *         tags:
 *           type: array
 *           items:
 *             type: number
 *             description: Id of the tag
 *             example: 12
 *         teams:
 *           type: array
 *           items:
 *             type: number
 *             description: Id of the team already assigned to the project
 *             example: 13
 *         teamLimit:
 *           oneOf:
 *             - type: number
 *             - type: null
 *           description: How many teams can be in the project
 *           example: 3
 *         documents:
 *           type: array
 *           items:
 *             $ref: "#/definitions/ProjectDocument"
 */

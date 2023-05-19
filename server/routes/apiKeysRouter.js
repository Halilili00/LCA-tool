import express from "express";
import { generateApiKey, getApiKey } from "../controllers/apiKeysController.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     ApiKeys:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - sub
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the apiKeys
 *         name:
 *           type: string
 *           description: The firstname and lastname of user
 *         email:
 *           type: string
 *           description: The user email
 *         sub:
 *           type: string
 *           description: The user sub/id
 *         apiKey:
 *           type: string
 *           description: The apiKey, that created for the user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the apiKey is created
 */

/**
 * @swagger
 * components:
 *  examples:
 *      apiKeyExample:
 *         value:
 *          name: Matti Meikä
 *          email: matti.meikä@email.com
 *          sub: 1234455
 */

/**
 * @swagger
 * tags:
 *  name: ApiKey
 *  description: The apiKey managing API
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * security:
 *   - bearerAuth: []
 * 
 * /api/apikey:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: List of apiKeys
 *    tags: [ApiKey]
 *    responses:
 *         200:
 *           description: All apiKeys
 *           content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/ApiKeys'
 *                  example:
 *                      apiKey: "string"
 *         404:
 *           description: No token no key!
 *         400:
 *           description: Somethings wrong
 *  post:
 *      summary: Create apiKey
 *      tags: [ApiKey]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiKeys'
 *           examples:
 *             apikeyExample:
 *              $ref: '#/components/examples/apiKeyExample'
 *      responses: 
 *         200:
 *           description: Generated apiKey for user
 *           content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/ApiKeys'
 *                  example:
 *                      apiKey: "string"
 *         400:
 *            description: Somethings wrong
 *         404:
 *            description: User already exist
 */

const route = express.Router();

route.post('/', generateApiKey);
route.get('/', getApiKey);

export default route;

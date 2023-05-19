import express from "express";

import { getMachiningPosts, createMachiningPost, updatePost, deletePost, getAllMachiningPosts } from "../controllers/postController.js";
import { auth, isAdmin } from "../middleware/auth.js";

/**
 * @swagger
 * tags:
 *  name: Datas
 *  description: The datas managing API
 * /api/posts/admin:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: List of data (Only admin users can use)
 *    tags: [Datas]
 *    responses:
 *         200:
 *           description: All datas
 *           content:
 *              application/json:
 *                  schema:
 *                      anyOf:
 *                          - $ref: '#/components/schemas/Machining'
 *                          - $ref: '#/components/schemas/PipeManufacturing'
 *         404:
 *           description: Error message
 * /api/posts:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: List of authenticated user data 
 *    tags: [Datas]
 *    responses:
 *         200:
 *           description: All data of the authenticated user 
 *           content:
 *              application/json:
 *                  schema:
 *                      anyOf:
 *                          - $ref: '#/components/schemas/Machining'
 *                          - $ref: '#/components/schemas/PipeManufacturing'
 *         404:
 *           description: Error message
 * /api/posts/{tempID}:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Create new data
 *      tags: [Datas]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             anyOf:
 *              - $ref: '#/components/schemas/Machining'
 *              - $ref: '#/components/schemas/PipeManufacturing'
 *           examples:
 *              Machinig:
 *                  $ref: '#/components/examples/machiningExample'
 *              PipeManufacturing:
 *                  $ref: '#/components/examples/pipemanufacturingExample'
 *      parameters:
 *      - in: path
 *        name: tempID 
 *        schema:
 *          type: string
 *          enum:
 *              - MAC-0001
 *              - PIP-0001
 *        required: true
 *        description: The template ID (Machining-> MAC-0001, Pipe Manufacturign-> PIP-0001)
 *      responses: 
 *         201:
 *           description: Created new data
 *           content:
 *              application/json:
 *                  schema:
 *                      anyOf:
 *                          - $ref: '#/components/schemas/Machining'
 *                          - $ref: '#/components/schemas/PipeManufacturing'
 *         400:
 *           description: Error message
 *         404:
 *           description: Invalid tempID
 * /api/posts/{tempID}/{postID}:
 *  patch:
 *      security:
 *          - bearerAuth: []
 *      summary: Update data with ID
 *      tags: [Datas]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *              - $ref: '#/components/schemas/Machining'
 *              - $ref: '#/components/schemas/PipeManufacturing'
 *           examples:
 *              Machinig:
 *                  $ref: '#/components/examples/machiningExample'
 *              PipeManufacturing:
 *                  $ref: '#/components/examples/pipemanufacturingExample'
 *      parameters:
 *      - in: path
 *        name: tempID
 *        schema:
 *          type: string
 *          enum:
 *              - MAC-0001
 *              - PIP-0001
 *        required: true
 *        description: The template ID (Machining-> MAC-0001, Pipe Manufacturign-> PIP-0001)
 *      - in: path
 *        name: postID
 *        schema:
 *          type: string
 *        required: true
 *        description: The postID created by MongoDB
 *      responses: 
 *         200:
 *           description: Updated data
 *           content:
 *              application/json:
 *                  schema:
 *                      anyOf:
 *                          - $ref: '#/components/schemas/Machining'
 *                          - $ref: '#/components/schemas/PipeManufacturing'
 *         204:
 *           description: No content               
 *         400:
 *           description: Error message
 *         404:
 *           description: Invalid tempID
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Remove data with tempID and postID
 *      tags: [Datas]
 *      parameters:
 *      - in: path
 *        name: tempID
 *        schema:
 *          type: string
 *          enum:
 *              - MAC-0001
 *              - PIP-0001
 *        required: true
 *        description: The template ID (Machining-> MAC-0001, Pipe Manufacturign-> PIP-0001)
 *      - in: path
 *        name: postID
 *        schema:
 *          type: string
 *        required: true
 *        description: The postID created by MongoDB
 *      responses: 
 *         200:
 *           description: Post is removed
 *         201:
 *           description: Not allowed
 *         404:
 *           description: Failed
 */

const router = express.Router();
router.use(auth)
router.get("/admin", isAdmin, getAllMachiningPosts);
router.get("/", getMachiningPosts);
router.post('/:tempID', createMachiningPost);
router.delete("/:tempID/:postID", deletePost);
router.patch('/:tempID/:postID', updatePost);

export default router;
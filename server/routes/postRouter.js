import express from "express";

import { getMachiningPosts, createMachiningPost, updatePost, deletePost } from "../controllers/postController.js";

const router = express.Router();
router.get("/", getMachiningPosts);
router.post('/',  createMachiningPost);
router.delete("/:id", deletePost);
router.patch('/:id', updatePost);

export default router;
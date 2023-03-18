import express from "express";

import { getMachiningPosts, createMachiningPost, updatePost, deletePost, getAllMachiningPosts } from "../controllers/postController.js";
import { auth, isAdmin } from "../middleware/auth.js";

const router = express.Router();
router.use(auth)
router.get("/",isAdmin, getAllMachiningPosts);
router.get("/:userID", getMachiningPosts);
router.post('/:tempID', createMachiningPost);
router.delete("/:tempID/:postID", deletePost);
router.patch('/:tempID/:postID', updatePost);

export default router;
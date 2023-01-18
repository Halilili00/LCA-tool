import express from "express";

import { getMachiningPosts, createMachiningPost, updatePost, deletePost } from "../controllers/postController.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/:userID",auth, getMachiningPosts);
router.post('/',auth, createMachiningPost);
router.delete("/:postID",auth, deletePost);
router.patch('/:postID',auth, updatePost);

export default router;
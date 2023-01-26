import express from "express";

import { getMachiningPosts, createMachiningPost, updatePost, deletePost, getAllMachiningPosts } from "../controllers/postController.js";
import { auth, isAdmin } from "../middleware/auth.js";
import route from "./adminsRouter.js";

const router = express.Router();
router.use(auth)
router.get("/",isAdmin, getAllMachiningPosts);
router.get("/:userID", getMachiningPosts);
router.post('/', createMachiningPost);
router.delete("/:postID", deletePost);
router.patch('/:postID', updatePost);

export default router;
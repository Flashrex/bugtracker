import { Router } from "express";

const router = Router();

import { listPosts, listSinglePost, listFewPosts, createPost, updatePost, deletePost } from "./controller";

router.get("/", listPosts);
router.get("/:id", listSinglePost);
router.get("/:limit/:offset", listFewPosts);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
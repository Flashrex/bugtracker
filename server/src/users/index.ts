import { Router } from "express";

const router = Router();

import { listUserProfile, listSingleUser, createUser, updateUser, deleteUser } from "./controller";

router.get("/profile", listUserProfile);
router.get("/:id", listSingleUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
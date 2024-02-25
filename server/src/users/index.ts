import { Router } from "express";

const router = Router();

import { listSingleUser, createUser, updateUser, deleteUser } from "./controller";

router.get("/:id", listSingleUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
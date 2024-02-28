import { Router } from "express";
import { listTeams, listSingleTeam, createTeam, updateTeam, deleteTeam } from "./controller";

const router = Router();

router.get("/", listTeams);
router.get("/:id", listSingleTeam);
router.post("/", createTeam);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);

export default router;
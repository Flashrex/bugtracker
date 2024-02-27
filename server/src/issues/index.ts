import { Router } from "express";

const router = Router();

import { listIssues, listSingleIssue, getIssueData, createIssue, updateIssue, deleteIssue } from "./controller";

router.get("/", listIssues);
router.get("/data", getIssueData);
router.get("/:id", listSingleIssue);
router.post("/", createIssue);
router.put("/:id", updateIssue);
router.delete("/:id", deleteIssue);

export default router;
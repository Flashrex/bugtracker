import model from "./model";
import userModel from "../users/model";
import logger from "../misc/logger";
import { Request, Response } from "express";

async function listIssues(req: Request, res: Response): Promise<void> {
    if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const user = await userModel.getById((req.user as { id: number }).id);

    if (!user) {
        res.status(500).json({ error: "Error creating issue." });
        return;
    }

    model.getAll(user.team)
        .then(async issues => {
            const updatedIssues = await Promise.all(issues.map(async (issue) => {
                const author = await userModel.getById(issue.created_by);
                const assigned_to = await userModel.getById(issue.assigned_to);
                return { ...issue, created_by: author, assigned_to: assigned_to };
            }));

            res.json(updatedIssues);
        })
        .catch(error => {
            logger.error("issues/listAction", `Error fetching issues: ${error}`);
            res.status(500).json({ error: "Error fetching issues" });
        });
}

function listSingleIssue(req: Request, res: Response): void {
    model.get(parseInt(req.params.id))
        .then(async issue => {
            res.json(issue);
        })
        .catch(error => {
            logger.error("issues/getAction", `Error fetching issue: ${error}`);
            res.status(500).json({ error: "Error fetching issue" });
        });
}

async function getIssueData(req: Request, res: Response): Promise<void> {
    if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const user = await userModel.getById((req.user as { id: number }).id);

    if (!user) {
        res.status(500).json({ error: "Error creating issue." });
        return;
    }

    Promise.all([model.getIssueData(user.team), model.getIssueCountByAuthors(user.team)])
        .then(([issueData, issueCountByAuthors]) => {
            const mergedData = {
                ...issueData,
                top_authors: issueCountByAuthors
            };
            res.json(mergedData);
        })
        .catch(error => {
            logger.error("issues/getIssueDataAction", `Error fetching issue data: ${error}`);
            res.status(500).json({ error: "Error fetching issue data" });
        });
}

async function createIssue(req: Request, res: Response): Promise<void> {

    if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const user = await userModel.getById((req.user as { id: number }).id);

    if (!user) {
        res.status(500).json({ error: "Error creating issue." });
        return;
    }

    const issue = {
        ...req.body,
        created_by: user,
        team: user.team
    };

    model.create(issue)
        .then(result => res.json(result))
        .catch(error => {
            logger.error("issues/createAction", `Error creating issue: ${error}`);
            res.status(500).json({ error: "Error creating issue" });
        });
}

function updateIssue(req: Request, res: Response): void {
    model.update(parseInt(req.params.id), req.body)
        .then(result => res.json(result))
        .catch(error => {
            logger.error("issues/updateAction", `Error updating issue: ${error}`);
            res.status(500).json({ error: "Error updating issue" });
        });
}

function deleteIssue(req: Request, res: Response): void {
    model.remove(parseInt(req.params.id))
        .then(result => res.json(result))
        .catch(error => {
            logger.error("issues/deleteAction", `Error deleting issue: ${error}`);
            res.status(500).json({ error: "Error deleting issue" });
        });
}

export {
    listIssues,
    listSingleIssue,
    getIssueData,
    createIssue,
    updateIssue,
    deleteIssue
};
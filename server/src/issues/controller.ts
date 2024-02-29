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

async function listSingleIssue(req: Request, res: Response): Promise<void> {
    if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const user = await userModel.getById((req.user as { id: number }).id);

    if (!user) {
        res.status(500).json({ error: "Error listing issue." });
        return;
    }

    model.get(parseInt(req.params.id))
        .then(async issue => {

            if (issue.team !== user.team) {
                res.status(401).json({ error: "Unauthorized" });
                return;
            }

            const author = await userModel.getById(issue.created_by);
            const assigned_to = await userModel.getById(issue.assigned_to);
            const updatedIssue = { ...issue, created_by: author, assigned_to: assigned_to };

            res.json(updatedIssue);
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

async function updateIssue(req: Request, res: Response): Promise<void> {
    if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    if (!isUserAutorized((req.user as { id: number }).id, parseInt(req.params.id))) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    model.update(parseInt(req.params.id), req.body)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            logger.error("issues/updateAction", `Error updating issue: ${error}`);
            res.status(500).json({ error: "Error updating issue" });
        });
}

async function deleteIssue(req: Request, res: Response): Promise<void> {
    if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    if (!isUserAutorized((req.user as { id: number }).id, parseInt(req.params.id))) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    model.remove(parseInt(req.params.id))
        .then(result => res.json(result))
        .catch(error => {
            logger.error("issues/deleteAction", `Error deleting issue: ${error}`);
            res.status(500).json({ error: "Error deleting issue" });
        });
}


async function isUserAutorized(userId: number, issueId: number) {
    const user = await userModel.getById(userId);

    if (!user) {
        return false;
    }

    const result = await model.get(issueId);
    return result.team === user.team;
}

export {
    listIssues,
    listSingleIssue,
    getIssueData,
    createIssue,
    updateIssue,
    deleteIssue
};
import model from "./model";
import userModel from "../users/model";
import logger from "../misc/logger";
import { Request, Response } from "express";

function listIssues(req: Request, res: Response): void {
    model.getAll()
        .then(issues => res.json(issues))
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

async function createIssue(req: Request, res: Response): Promise<void> {

    //todo: check if user is logged in and get user from database
    //let user = {} as User;

    const user = await userModel.get(1);

    if (!user) {
        //todo: return error
        return;
    }

    const issue = {
        ...req.body,
        created_by: user
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
    createIssue,
    updateIssue,
    deleteIssue
};
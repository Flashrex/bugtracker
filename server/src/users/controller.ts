import model from "./model";
import logger from "../misc/logger";
import { Request, Response } from "express";
import teamModel from "../teams/model";

function listUserProfile(req: Request, res: Response): void {
    if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    model.getById((req.user as { id: number }).id)
        .then(async user => {
            const team = await teamModel.getById(user.team);
            user.team = team;
            user.password = undefined;

            res.json(user)
        })
        .catch(error => {
            logger.error("users/getProfileAction", `Error fetching user: ${error}`);
            res.status(500).json({ error: "Error fetching user" });
        });
}

function listSingleUser(req: Request, res: Response): void {
    model.getById(parseInt(req.params.id))
        .then(user => {
            user.password = undefined;
            res.json(user)
        })
        .catch(error => {
            logger.error("users/getAction", `Error fetching user: ${error}`);
            res.status(500).json({ error: "Error fetching user" });
        });
}

function createUser(req: Request, res: Response): void {
    model.create(req.body.username, req.body.password)
        .then(result => res.json(result))
        .catch(error => {
            logger.error("users/createAction", `Error creating user: ${error}`);
            res.status(500).json({ error: "Error creating user" });
        });
}

async function updateUser(req: Request, res: Response): Promise<void> {

    if (req.body.team) {

        if (!await teamModel.exists(req.body.team)) {
            const response = await teamModel.create({ name: req.body.team, created_by: req.params.id })
            req.body.team = response.insertId;
        }

    }

    model.update(parseInt(req.params.id), req.body)
        .then(result => res.json(result))
        .catch(error => {
            logger.error("users/updateAction", `Error updating user: ${error}`);
            res.status(500).json({ error: "Error updating user" });
        });
}

function deleteUser(req: Request, res: Response): void {
    model.remove(parseInt(req.params.id))
        .then(result => res.json(result))
        .catch(error => {
            logger.error("users/deleteAction", `Error deleting user: ${error}`);
            res.status(500).json({ error: "Error deleting user" });
        });
}

export {
    listUserProfile,
    listSingleUser,
    createUser,
    updateUser,
    deleteUser
};
import model from "./model";
import logger from "../misc/logger";
import { Request, Response } from "express";


function listSingleUser(req: Request, res: Response): void {
    model.get(parseInt(req.params.id))
        .then(issue => res.json(issue))
        .catch(error => {
            logger.error("users/getAction", `Error fetching user: ${error}`);
            res.status(500).json({ error: "Error fetching user" });
        });
}

function createUser(req: Request, res: Response): void {
    model.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
            logger.error("users/createAction", `Error creating user: ${error}`);
            res.status(500).json({ error: "Error creating user" });
        });
}

function updateUser(req: Request, res: Response): void {
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
    listSingleUser,
    createUser,
    updateUser,
    deleteUser
};
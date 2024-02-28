import model from "./model";
import userModel from "../users/model";
import logger from "../misc/logger";
import { Request, Response } from "express";
import { Team } from "../misc/types";

function listTeams(req: Request, res: Response): void {
    model.getAll()
        .then(teams => res.json(teams))
        .catch(error => {
            logger.error("teams/listAction", `Error fetching teams: ${error}`);
            res.status(500).json({ error: "Error fetching teams" });
        });
}

function listSingleTeam(req: Request, res: Response): void {
    model.getById(parseInt(req.params.id))
        .then(async team => {
            res.json(team);
        })
        .catch(error => {
            logger.error("teams/getAction", `Error fetching team: ${error}`);
            res.status(500).json({ error: "Error fetching team" });
        });
}

function createTeam(req: Request, res: Response): void {

    if (!req.user) return;

    const user = userModel.getById((req.user as { id: number }).id);

    if (!user) {
        res.status(500).json({ error: "Error creating team." });
        return;
    }

    const team = {
        ...req.body,
        created_by: user
    } as Team;

    model.create(team)
        .then(result => res.json(result))
        .catch(error => {
            logger.error("teams/createAction", `Error creating team: ${error}`);
            res.status(500).json({ error: "Error creating team" });
        });
}

function updateTeam(req: Request, res: Response): void {
    model.update(req.body)
        .then(result => res.json(result))
        .catch(error => {
            logger.error("teams/updateAction", `Error updating team: ${error}`);
            res.status(500).json({ error: "Error updating team" });
        });
}

function deleteTeam(req: Request, res: Response): void {
    model.remove(req.body.id)
        .then(result => res.json(result))
        .catch(error => {
            logger.error("teams/deleteAction", `Error deleting team: ${error}`);
            res.status(500).json({ error: "Error deleting team" });
        });
}

export {
    listTeams,
    listSingleTeam,
    createTeam,
    updateTeam,
    deleteTeam
};

import database from '../database';
import log from '../misc/logger';
import userModel from "../users/model";

function exists(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
        database.query('SELECT * FROM teams WHERE id = ? LIMIT 1', [id], (error, results) => {
            if (error) {
                log.error("teams/exists", `Error checking if team exists: ${error}`);
                reject(error);
                return;
            }

            resolve(results.length > 0);
        });
    });
}

function getAll(): Promise<any> {
    return new Promise((resolve, reject) => {
        database.query('SELECT * FROM teams', async (error, results) => {
            if (error) {
                log.error("teams/getAll", `Error fetching teams from database: ${error}`);
                reject(error);
                return;
            }

            await Promise.all(results.map(async (result) => {
                result.author = await userModel.getById(result.author);
            }));

            resolve(results);
        });
    });
}

function getById(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
        database.query('SELECT * FROM teams WHERE id = ? LIMIT 1', [id], async (error, results) => {
            if (error) {
                log.error("teams/getById", `Error fetching team from database: ${error}`);
                reject(error);
                return;
            }

            resolve(results[0]);

        });
    });
}

function create(team: any): Promise<any> {

    team.created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

    return new Promise((resolve, reject) => {
        database.query('INSERT INTO teams SET ?', team, (error, results) => {
            if (error) {
                log.error("teams/create", `Error creating team: ${error}`);
                reject(error);
                return;
            }

            resolve(results);
        });
    });
}

function update(team: any): Promise<any> {
    return new Promise((resolve, reject) => {
        database.query('UPDATE teams SET ? WHERE id = ?', [team, team.id], (error, results) => {
            if (error) {
                log.error("teams/update", `Error updating team: ${error}`);
                reject(error);
                return;
            }

            resolve(results);
        });
    });
}

function remove(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
        database.query('DELETE FROM teams WHERE id = ?', [id], (error, results) => {
            if (error) {
                log.error("teams/delete", `Error deleting team: ${error}`);
                reject(error);
                return;
            }

            resolve(results);
        });
    });
}

export default {
    exists,
    getAll,
    getById,
    create,
    update,
    remove
};
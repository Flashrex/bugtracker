import database from '../database';
import log from '../misc/logger';
import { Issue } from '../misc/types';

function getAll(): Promise<Issue[]> {
    return new Promise((resolve, reject) => {
        database.query('SELECT * FROM issues', (error, results) => {
            if (error) {
                log.error("issues/getAll", `Error fetching issues from database: ${error}`);
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

function get(id: number): Promise<Issue> {
    return new Promise((resolve, reject) => {
        database.query('SELECT * FROM issues WHERE id = ?', [id], (error, results) => {
            if (error) {
                log.error("issues/get", `Error fetching issue from database: ${error}`);
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

function create(issue: Issue): Promise<any> {

    return new Promise((resolve, reject) => {
        const curTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

        let query = `INSERT INTO issues 
            (title, description, status, created_at, updated_at, created_by) 
            VALUES ('${issue.title}', '${issue.description}', '${issue.status}', '${curTime}', '${curTime}', ${issue.created_by.id})`;

        database.query(query, (error, results) => {
            if (error) {
                log.error("issues/create", `Error creating issue in database: ${error}`);
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

function update(id: number, issue: Issue): Promise<any> {
    return new Promise((resolve, reject) => {
        database.query('UPDATE issues SET ? WHERE id = ?', [issue, id], (error, results) => {
            if (error) {
                log.error("issues/update", `Error updating issue in database: ${error}`);
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

function remove(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
        database.query('DELETE FROM issues WHERE id = ?', [id], (error, results) => {
            if (error) {
                log.error("issues/remove", `Error deleting issue from database: ${error}`);
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

export default {
    getAll,
    get,
    create,
    update,
    remove,
};
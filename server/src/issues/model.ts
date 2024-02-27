import database from '../database';
import log from '../misc/logger';
import { Issue, IssueData } from '../misc/types';
import userModel from "../users/model";

function getAll(): Promise<Issue[]> {
    return new Promise((resolve, reject) => {
        database.query('SELECT * FROM issues', async (error, results) => {
            if (error) {
                log.error("issues/getAll", `Error fetching issues from database: ${error}`);
                reject(error);
                return;
            }

            await Promise.all(results.map(async (result) => {
                result.created_by = await userModel.get(result.created_by);
            }));

            resolve(results);
        });
    });
}

function get(id: number): Promise<Issue> {
    return new Promise((resolve, reject) => {
        database.query('SELECT * FROM issues WHERE id = ? LIMIT 1', [id], async (error, results) => {
            if (error) {
                log.error("issues/get", `Error fetching issue from database: ${error}`);
                reject(error);
                return;
            }

            results[0].created_by = await userModel.get(results[0].created_by);

            resolve(results[0]);
        });
    });
}

function getIssueData(): Promise<IssueData> {
    return new Promise((resolve, reject) => {
        database.query(`
        SELECT 
        COUNT(*) AS total,
        SUM(CASE WHEN status = 'open' THEN 1 ELSE 0 END) AS open,
        SUM(CASE WHEN status = 'closed' THEN 1 ELSE 0 END) AS closed,
        SUM(CASE WHEN MONTH(created_at) = MONTH(CURRENT_DATE) AND YEAR(created_at) = YEAR(CURRENT_DATE) THEN 1 ELSE 0 END) AS issues_this_month,
        SUM(CASE WHEN MONTH(created_at) = MONTH(DATE_ADD(CURRENT_DATE, INTERVAL -1 MONTH)) AND YEAR(created_at) = YEAR(DATE_ADD(CURRENT_DATE, INTERVAL -1 MONTH)) THEN 1 ELSE 0 END) AS issues_last_month
        FROM issues;`, async (error, results) => {
            if (error) {
                log.error("issues/getIssueData", `Error fetching issue data from database: ${error}`);
                reject(error);
                return;
            }

            resolve(results[0]);
        });
    });
}

function getIssueCountByAuthors(): Promise<any> {
    return new Promise((resolve, reject) => {
        database.query(`
        SELECT 
        COUNT(*) AS count,
        users.username
        FROM issues
        JOIN users ON issues.created_by = users.id
        GROUP BY created_by
        ORDER BY count DESC
        LIMIT 5;`, async (error, results) => {
            if (error) {
                log.error("issues/getIssueCountByAuthors", `Error fetching issue count by authors from database: ${error}`);
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
            VALUES (?, ?, ?, ?, ?, ?)`;

        let values = [issue.title, issue.description, issue.status, curTime, curTime, issue.created_by.id];

        database.query(query, values, (error, results) => {
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

    issue = {
        ...issue,
        updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }


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
    getIssueData,
    getIssueCountByAuthors,
    create,
    update,
    remove,
};
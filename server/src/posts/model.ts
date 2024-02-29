import database from '../database';
import log from '../misc/logger';
import { Post } from '../misc/types';

function getAll(team: number): Promise<any> {
    return new Promise((resolve, reject) => {
        database.query('SELECT * FROM posts WHERE team = ?', [team], async (error, results) => {
            if (error) {
                log.error("posts/getAll", `Error fetching posts from database: ${error}`);
                reject(error);
                return;
            }

            resolve(results);
        });
    });
}

function getSome(limit: number, offset: number): Promise<any> {
    return new Promise((resolve, reject) => {
        database.query('SELECT * FROM posts LIMIT ? OFFSET ?', [limit, offset], async (error, results) => {
            if (error) {
                log.error("posts/getSome", `Error fetching posts from database: ${error}`);
                reject(error);
                return;
            }

            resolve(results);
        });
    });
}

function get(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
        database.query('SELECT * FROM posts WHERE id = ? LIMIT 1', [id], async (error, results) => {
            if (error) {
                log.error("posts/get", `Error fetching post from database: ${error}`);
                reject(error);
                return;
            }

            resolve(results[0]);
        });
    });
}

function create(post: Post): Promise<any> {

    return new Promise((resolve, reject) => {
        const curTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

        let query = `INSERT INTO posts 
            (content, created_at, author, team) 
            VALUES (?, ?, ?, ?)`;

        let values = [post.content, curTime, post.author, post.team];

        database.query(query, values, (error, results) => {
            if (error) {
                log.error("posts/create", `Error creating post in database: ${error}`);
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

function update(id: number, post: Post): Promise<any> {
    return new Promise((resolve, reject) => {

        let query = `UPDATE posts 
            SET content = ?
            WHERE id = ?`;

        let values = [post.content, id];

        database.query(query, values, (error, results) => {
            if (error) {
                log.error("posts/update", `Error updating post in database: ${error}`);
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

function remove(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
        database.query('DELETE FROM posts WHERE id = ?', [id], (error, results) => {
            if (error) {
                log.error("posts/delete", `Error deleting post from database: ${error}`);
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}


export default {
    getAll,
    getSome,
    get,
    create,
    update,
    remove
};
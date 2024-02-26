import database from '../database';
import log from '../misc/logger';
import { Post } from '../misc/types';
import userModel from "../users/model";

function getAll(): Promise<any> {
    return new Promise((resolve, reject) => {
        database.query('SELECT * FROM posts', async (error, results) => {
            if (error) {
                log.error("posts/getAll", `Error fetching posts from database: ${error}`);
                reject(error);
                return;
            }

            await Promise.all(results.map(async (result) => {
                result.author = await userModel.get(result.author);
            }));

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

            await Promise.all(results.map(async (result) => {
                result.author = await userModel.get(result.author);
            }));

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

            results[0].author = await userModel.get(results[0].author);

            resolve(results[0]);
        });
    });
}

function create(post: Post): Promise<any> {

    return new Promise((resolve, reject) => {
        const curTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

        let query = `INSERT INTO posts 
            (content, created_at, author) 
            VALUES ('${post.content}', '${curTime}', ${post.author.id})`;

        database.query(query, (error, results) => {
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
        const curTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

        let query = `UPDATE posts 
            SET content = '${post.content}' 
            WHERE id = ${id}`;

        database.query(query, (error, results) => {
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
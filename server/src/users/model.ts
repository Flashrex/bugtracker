import database from '../database';
import log from '../misc/logger';
import { User } from '../misc/types';

function get(username: string): Promise<User> {
    return new Promise((resolve, reject) => {
        database.query('SELECT * FROM users WHERE username = ? LIMIT 1', [username], (error, results) => {
            if (error) {
                log.error("users/get", `Error fetching user from database: ${error}`);
                reject(error);
                return;
            }
            resolve(results[0]);
        });
    });
}

function getById(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
        database.query('SELECT * FROM users WHERE id = ? LIMIT 1', [id], (error, results) => {
            if (error) {
                log.error("users/getById", `Error fetching user from database: ${error}`);
                reject(error);
                return;
            }
            resolve(results[0]);
        });
    });
}

function create(username: string, password: string): Promise<any> {

    const user = {
        username: username,
        password: password,
        created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }


    return new Promise((resolve, reject) => {
        database.query('INSERT INTO users SET ?', user, (error, results) => {
            if (error) {
                log.error("users/create", `Error creating user in database: ${error}`);
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

function update(id: number, user: User): Promise<any> {
    return new Promise((resolve, reject) => {
        database.query('UPDATE users SET ? WHERE id = ?', [user, id], (error, results) => {
            if (error) {
                log.error("users/update", `Error updating user in database: ${error}`);
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

function remove(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
        database.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
            if (error) {
                log.error("users/delete", `Error deleting user from database: ${error}`);
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

export default {
    get,
    getById,
    create,
    update,
    remove
};
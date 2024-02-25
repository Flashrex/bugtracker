import mysql from 'mysql';
import Logger from './misc/logger';

const connection = mysql.createConnection({
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || '',
    database: process.env.DATABASE || 'test',
});

connection.connect((err) => {
    if (err) {
        Logger.error('database', `Error connecting to database: ${err}`);
        return;
    }
    Logger.log('database', `Connected to database [${process.env.HOST}:${process.env.DATABASE}]`);
});

export default connection;
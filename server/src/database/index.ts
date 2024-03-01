import mysql from 'mysql';
import Logger from '../misc/logger';
import ENV from '../misc/environment';
import createTables from './model';

const connection = mysql.createConnection({
    host: ENV.DATABASE_HOST || 'localhost',
    port: parseInt(ENV.DATABASE_PORT) || 3306,
    user: ENV.DATABASE_USER || 'root',
    password: ENV.DATABASE_PASSWORD || '',
    database: ENV.DATABASE_NAME || 'bugtracker',
});

connection.connect(async (err) => {
    if (err) {
        Logger.error('database', `Error connecting to database: ${err}`);
        return;
    }
    Logger.log('database', `Connected to database [\x1b[34m${process.env.DB_HOST}:${process.env.DB_PORT}\x1b[0m]`);

    await createTables();
});


export default connection;


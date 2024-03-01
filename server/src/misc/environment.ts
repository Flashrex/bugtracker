import Logger from '../misc/logger';

const ENV = {
    CLIENT_URL: process.env.CLIENT_URL,
    APP_PORT: process.env.APP_PORT,
    SESSION_SECRET: process.env.SESSION_SECRET,
    DATABASE_HOST: process.env.DB_HOST,
    DATABASE_PORT: process.env.DB_PORT,
    DATABASE_USER: process.env.DB_USER,
    DATABASE_PASSWORD: process.env.DB_PASSWORD,
    DATABASE_NAME: process.env.DB_NAME,
};

Object.entries(ENV).forEach(([key, value]) => {
    if (!value) {
        Logger.error("app", `${key} is not set`);
        process.exit(1);
    }
});

export default ENV;
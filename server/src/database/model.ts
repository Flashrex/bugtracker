import connection from './index';

function createUsersTable() {
    return connection.query(`
    CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    team INT,
    FOREIGN KEY (team) REFERENCES teams(id)
    );
  `);
}

function createTeamsTable() {
    return connection.query(`
    CREATE TABLE IF NOT EXISTS teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES users(id)
    );
  `);
}

function createIssuesTable() {
    return connection.query(`
    CREATE TABLE IF NOT EXISTS issues (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    assigned_to INT,
    status VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    team INT,
    FOREIGN KEY (assigned_to) REFERENCES users(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (team_id) REFERENCES teams(id)
    );
  `);
}

function createPostsTable() {
    return connection.query(`
    CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author INT,
    team INT,
    FOREIGN KEY (author) REFERENCES users(id),
    FOREIGN KEY (team) REFERENCES teams(id)
    );
  `);
}

function createDatabase() {
    return connection.query(`
    CREATE DATABASE IF NOT EXISTS bugtracker;
  `);
}

async function createTables() {
    await createDatabase();
    await createUsersTable();
    await createTeamsTable();
    await createIssuesTable();
    await createPostsTable();
}

export default createTables;
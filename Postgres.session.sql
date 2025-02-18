CREATE DATABASE Lumaa;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    isComplete BOOLEAN DEFAULT false,
    userId INTEGER REFERENCES users(id) ON DELETE CASCADE
);

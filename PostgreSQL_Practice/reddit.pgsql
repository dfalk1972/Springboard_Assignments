DROP DATABASE reddit_db;
CREATE DATABASE reddit_db;
\c reddit_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(20) NOT NULL
);


CREATE TABLE subreddits (
    id SERIAL PRIMARY KEY,
    name VARCHAR(15) NOT NULL,
    user_id INTEGER REFERENCES users ON DELETE SET NULL,
    description TEXT,
    subscribers INTEGER CHECK (subscribers >0) DEFAULT 1,
    is_private BOOLEAN DEFAULT false

);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY, 
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    comment_text TEXT NOT NULL
);



INSERT INTO users (username, password)
VALUES
('belle', 'I_like_food!'),
('sadie','I_like_sleep');

INSERT INTO subreddits (name, user_id)
VALUES
('chickens', 2),
('dog food',1);
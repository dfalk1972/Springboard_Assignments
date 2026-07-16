DROP DATABASE IF EXISTS soccer_league;

CREATE DATABASE soccer_league;

\c soccer_league;

CREATE TABLE team (
    id SERIAL PRIMARY KEY,
    team_name TEXT
);

CREATE TABLE player (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    team_id INTEGER REFERENCES team(id)
);

CREATE TABLE referee(
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT
);

CREATE TABLE season (
    id SERIAL PRIMARY KEY,
    start_date DATE,
    end_date DATE
);


CREATE TABLE game(
    id SERIAL PRIMARY KEY,
    team_1_id INTEGER REFERENCES team(id),
    team_2_id INTEGER REFERENCES team(id),
    season_id INTEGER REFERENCES season(id),
    game_date DATE
);

CREATE TABLE goal(
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES player(id),
    team_id INTEGER REFERENCES team(id),
    game_id INTEGER REFERENCES game(id)
);

CREATE TABLE ref_game(
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES game(id),
    referee_id INTEGER REFERENCES referee(id)
);




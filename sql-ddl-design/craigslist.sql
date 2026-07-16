DROP DATABASE if EXISTS craigslist;
CREATE DATABASE craigslist;
\c craigslist;

CREATE TABLE region(
    id SERIAL PRIMARY KEY,
    reg_name TEXT
);

CREATE TABLE cl_user (
    id SERIAL PRIMARY KEY, 
    first_name TEXT,    
    last_name TEXT,  
    username TEXT,
    preferred_region_id INTEGER REFERENCES region(id)
);

CREATE TABLE category (
    id SERIAL PRIMARY KEY, 
    cat_name TEXT
);

CREATE TABLE post (
    id SERIAL PRIMARY KEY, 
    title TEXT, 
    post_text TEXT,
    user_id INTEGER REFERENCES cl_user(id),
    location TEXT, 
    region_id INTEGER REFERENCES region(id)
);

CREATE TABLE post_category (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES post(id),
    category_id INTEGER REFERENCES category(id)
);




DROP DATABASE if EXISTS medical_center;
CREATE DATABASE medical_center;
\c medical_center;

CREATE TABLE patient (
    id SERIAL PRIMARY KEY, 
    first_name TEXT, 
    middle_initial TEXT, 
    last_name TEXT, 
    date_of_birth DATE
);

CREATE TABLE doctor(
    id SERIAL PRIMARY KEY, 
    first_name TEXT,
    last_name TEXT, 
    credential TEXT
);

CREATE TABLE disease (
    id SERIAL PRIMARY KEY, 
    name TEXT,
    description TEXT,
    class TEXT 
);

CREATE TABLE visits (
   id SERIAL PRIMARY KEY, 
   patient_id INTEGER REFERENCES patient(id),
   doctor_id INTEGER REFERENCES doctor(id),
   visit_date DATE
);

CREATE TABLE diagnosis(
    id SERIAL PRIMARY KEY, 
    disease_id INTEGER REFERENCES disease(id),
    visit_id INTEGER REFERENCES visits(id)

);
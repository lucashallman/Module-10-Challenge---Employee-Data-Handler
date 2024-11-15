\c postgres;

DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

\c business_db;


CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    title VARCHAR(20) NOT NULL
);


CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    dept_id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
);


CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    dept_id INT NOT NULL,
    role_id VARCHAR(30) NOT NULL,
    Name VARCHAR(255) NOT NULL,

    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);


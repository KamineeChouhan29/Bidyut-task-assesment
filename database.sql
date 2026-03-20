-- SQL Script to initialize Task Manager Database

CREATE DATABASE IF NOT EXISTS task_db;
USE task_db;

CREATE TABLE IF NOT EXISTS tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('OPEN', 'COMPLETED') DEFAULT 'OPEN',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample Data
INSERT INTO tasks (title, description, status) VALUES 
('Learn Spring Boot', 'Build a REST API', 'COMPLETED'),
('Learn Angular', 'Build a modern UI', 'OPEN'),
('Integrate MySQL', 'Connect backend to database', 'OPEN');

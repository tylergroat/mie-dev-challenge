-- schema.sql

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS miechallenge;

-- Use the database
USE miechallenge;

-- Games Table
CREATE TABLE IF NOT EXISTS Games (
    game_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    min_players INT,
    max_players INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- GameSessions Table
CREATE TABLE IF NOT EXISTS GameSessions (
    session_id INT AUTO_INCREMENT PRIMARY KEY,
    game_id INT,
    date_played DATE,
    attendees TEXT,
    comments TEXT,
    FOREIGN KEY (game_id) REFERENCES Games(game_id)
);

-- Insert sample data if the table was just created or is empty
INSERT INTO Games (title, description, min_players, max_players)
SELECT 'Settlers of Catan', 'Build and settle on the island of Catan', 3, 4
UNION
SELECT 'Ticket to Ride', 'Build train routes across the country', 2, 5
UNION
SELECT 'Codenames', 'Word game of guessing and deduction', 4, 8
WHERE NOT EXISTS (SELECT 1 FROM Games LIMIT 1);

-- Insert sample data if the table was just created or is empty
INSERT INTO GameSessions (game_id, date_played, attendees, comments)
SELECT 1, '2023-01-15', 'Alice, Bob, Charlie', 'Close game, intense trading!'
UNION
SELECT 2, '2023-02-03', 'Alice, Bob, Carol, Dave', 'Longest route achievement unlocked!'
UNION
SELECT 3, '2023-02-20', 'Alice, Bob, Charlie, Eve', 'Epic spy showdown!'
UNION
SELECT 1, '2023-03-10', 'Alice, Bob, Carol, Dave', 'New player joined, great addition!'
WHERE NOT EXISTS (SELECT 1 FROM GameSessions LIMIT 1);

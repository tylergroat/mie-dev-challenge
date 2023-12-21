-- schema.sql

-- Create the database
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

-- Games sample data
-- Inserts sample data if the table is empty during execution
INSERT INTO Games (title, description, min_players, max_players)
SELECT 'Scrabble', 'Word game where players score points by placing tiles, bearing a single letter, onto a gameboard', 2, 4
UNION
SELECT 'Monopoly', 'Real estate trading game', 2, 6
UNION
SELECT 'Chess', 'Strategy board game played on a checkered board', 2, 2
WHERE NOT EXISTS (SELECT 1 FROM Games LIMIT 1);

-- GameSessions sample data
-- Inserts sample data if the table is empty during execution
INSERT INTO GameSessions (game_id, date_played, attendees, comments)
SELECT 1, '2023-01-15', 'Alice, Bob', 'Intense word battle!'
UNION
SELECT 2, '2023-02-03', 'Alice, Bob, Carol, Dave', 'Epic real estate trading!'
UNION
SELECT 3, '2023-02-20', 'Alice, Bob', 'Tactical moves and strategy!'
WHERE NOT EXISTS (SELECT 1 FROM GameSessions LIMIT 1);

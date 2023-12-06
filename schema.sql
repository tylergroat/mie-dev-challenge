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
    attendees TEXT, -- Consider changing this to a related table if there can be multiple attendees per session
    comments TEXT,
    FOREIGN KEY (game_id) REFERENCES Games(game_id)
);

-- Games Table
INSERT INTO Games (title, description, min_players, max_players) VALUES
    ('Settlers of Catan', 'Build and settle on the island of Catan', 3, 4),
    ('Ticket to Ride', 'Build train routes across the country', 2, 5),
    ('Codenames', 'Word game of guessing and deduction', 4, 8);
-- GameSessions Table
INSERT INTO GameSessions (game_id, date_played, attendees, comments) VALUES
    (1, '2023-01-15', 'Alice, Bob, Charlie', 'Close game, intense trading!'),
    (2, '2023-02-03', 'Alice, Bob, Carol, Dave', 'Longest route achievement unlocked!'),
    (3, '2023-02-20', 'Alice, Bob, Charlie, Eve', 'Epic spy showdown!'),
    (1, '2023-03-10', 'Alice, Bob, Carol, Dave', 'New player joined, great addition!');


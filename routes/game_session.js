// routes/game_session.js

const express = require('express');
const router = express.Router();
const { pool } = require('../database');

// Middleware to log the current working directory and file path
router.use((req, res, next) => {
  console.log(`Current working directory: ${process.cwd()}`);
  console.log(`Absolute path of this file: ${__filename}`);
  next();
});

// Update the route handlers
router.get('/add-game-session', (req, res) => {
  console.log(`Handling request for ${req.path}`);
  // Retrieve all games for the dropdown menu
  const query = 'SELECT * FROM Games';
  pool.query(query, (err, games) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving games');
      return;
    }

    res.render('add-game-session.ejs', {
      title: 'Board Games | Add Game Session',
      games,
    });
  });
});

router.post('/add-game-session', (req, res) => {
  console.log(`Handling request for ${req.path}`);
  const { gameId, datePlayed, attendees, comments } = req.body;
  const query = `INSERT INTO GameSessions (game_id, date_played, attendees, comments) VALUES (?, ?, ?, ?)`;

  pool.query(query, [gameId, datePlayed, attendees, comments], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error adding game session');
      return;
    }

    res.redirect('/');
  });
});

module.exports = { router }; // Export the router as an object

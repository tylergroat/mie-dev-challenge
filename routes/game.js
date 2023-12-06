// routes/game.js

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
router.get('/add-game', (req, res) => {
	console.log(`Handling request for ${req.path}`);
	res.render('add-game.ejs', {
		title: 'Board Games | Add game',
	});
});

router.get('/edit-game/:id', (req, res) => {
	console.log(`Handling request for ${req.path}`);
	const gameId = req.params.id;
	const query = 'SELECT * FROM Games WHERE game_id = ?';

	pool.query(query, [gameId], (err, results) => {
		if (err) {
			console.error(err);
			res.redirect('/');
			return;
		}

		const game = results[0];
		res.render('edit-game.ejs', {
			title: 'Board Games | Edit game',
			game,
		});
	});
});

router.post('/add-game', (req, res) => {
	console.log(`Handling request for ${req.path}`);
	const { title, description, minPlayers, maxPlayers, category } = req.body;
	const query = `INSERT INTO Games (title, description, min_players, max_players, category) VALUES (?, ?, ?, ?, ?)`;

	pool.query(query, [title, description, minPlayers, maxPlayers, category], (err) => {
		if (err) {
			console.error(err);
			res.status(500).send('Error adding game');
			return;
		}

		res.redirect('/');
	});
});

router.post('/edit-game/:id', (req, res) => {
	console.log(`Handling request for ${req.path}`);
	const { title, description, minPlayers, maxPlayers, category } = req.body;
	const gameId = req.params.id;
	const query = `UPDATE Games SET title = ?, description = ?, min_players = ?, max_players = ?, category = ? WHERE game_id = ?`;

	pool.query(query, [title, description, minPlayers, maxPlayers, category, gameId], (err) => {
		if (err) {
			console.error(err);
			res.status(500).send('Error updating game');
			return;
		}

		res.redirect('/');
	});
});

module.exports = { router }; // Export the router as an object

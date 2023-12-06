// routes/index.js
const express = require('express');
const router = express.Router();
const { pool } = require('../database');

router.use((req, res, next) => {
	console.log(`Current working directory: ${process.cwd()}`);
	console.log(`Absolute path of this file: ${__filename}`);
	next();
});

router.get('/', (req, res) => {
	console.log(`Handling request for ${req.path}`);

	let query = "SELECT * FROM Games";

	pool.query(query, (err, games) => {
		if (err) {
			res.redirect('/');
		} else {
			res.render('index.ejs', {
				title: 'Board Games | View Games',
				games: games
			});
		}
	});
});

module.exports = { router }; // Export the router as an object

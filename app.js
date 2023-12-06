// app.js
// Main entry point for the application

const express = require('express');
const mariadb = require('mariadb');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./config');
const { router: indexRouter } = require('./routes/index');
const { router: gameRouter } = require('./routes/game');
const { router: gameSessionRouter } = require('./routes/game_session');
const port = 3000;
const app = express();
const { pool } = require('./database');

app.set('port', process.env.port || config.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Acquire a connection from the pool for each request
app.use(async (req, res, next) => {
	try {
		const connection = await pool.getConnection();
		req.socket = connection;
		await next();
		connection.release(); // Release the connection back to the pool
	} catch (err) {
		console.error('Error acquiring database connection:', err);
		next(err);
	}
});

// Routes
app.use('/', indexRouter);
app.use('/game', gameRouter);
app.use('/game-session', gameSessionRouter);

app.listen(config.port, () => {
	console.log(`Server running on port: ${config.port}`);
});

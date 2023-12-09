// app.js
// Main entry point for application

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const { getHomePage } = require('./routes/index');
const game = require('./routes/game');
const game_session = require('./routes/game_session');

const port = config.port; //port 3000

// Database Setup
// Create a connection pool
const pool = mariadb.createPool({
	host: config.db.host,
	user: config.db.user,
	password: config.db.password,
	database: config.db.database,
	trace: true,
	// connectionLimit: 5
});

pool.getConnection()
	.then(connection => {
		console.log('Connected to MariaDB database');
		connection.release(); // Release the connection back to the pool
	})
	.catch(err => {
		console.error('Error connecting to MariaDB:', err);
	});

global.pool = pool;

// Configuration
app.set('port', process.env.port || port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Middleware
// If there are static files, make a public directory
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', getHomePage);
app.get('/add-game', game.getAdd);
app.post('/add-game', game.postAdd);
app.get('/edit-game/:id', game.getEdit);
app.post('/edit-game/:id', game.postEdit);
app.get('/add-game-session', game_session.getAdd);
app.post('/add-game-session', game_session.postAdd);

// Start the server
app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});

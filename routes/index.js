// routes/index.js

module.exports = {
	getHomePage: (req, res) => {
		let connection;

		// Use the connection pool to query the database for games and game sessions
		pool.getConnection()
			.then(conn => {
				connection = conn; // Assign the connection to the outer variable
				return Promise.all([
					connection.query('SELECT * FROM Games'),
					connection.query('SELECT * FROM GameSessions'),
				]);
			})
			.then(([games, gameSessions]) => {
				res.render('index', { games, gameSessions, title: 'Board Games' });
			})
			.catch(err => {
				console.error('Error fetching data:', err);
				res.render('index', { games: [], gameSessions: [], title: 'Board Games' });
			})
			.finally(() => {
				if (connection) {
					connection.release(); // Release the connection back to the pool
				}
			});
	}
};
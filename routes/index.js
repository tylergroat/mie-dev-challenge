// routes/index.js

module.exports = {
	getHomePage: (req, res) => {
		let connection;

		// Use the connection pool to query the database for games
		pool.getConnection()
			.then(conn => {
				connection = conn; // Assign the connection to the outer variable
				// console.log(`(.then) Total connections in the pool: ${pool.totalConnections()}`);
				return connection.query('SELECT * FROM Games');
			})
			.then(games => {
				res.render('index', { games, title: 'Board Games' });
			})
			.catch(err => {
				console.error('Error fetching games:', err);
				res.render('index', { games: [], title: 'Board Games' });
			})
			.finally(() => {
				if (connection) {
					// console.log(`(.finally - before .release) Total connections in the pool: ${pool.totalConnections()}`);
					connection.release(); // Release the connection back to the pool
					// console.log('Connection released - getHomePage in index.js');
					// console.log(`(.finally - after .release) Total connections in the pool: ${pool.totalConnections()}`);
				}
			});
	}
};

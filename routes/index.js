// routes/index.js

module.exports = {
	getHomePage: (req, res) => {
		// Use the connection pool to query the database for games
		pool.getConnection()
			.then(connection => {
				return connection.query('SELECT * FROM Games');
			})
			.then(games => {
				res.render('index', { games, title: 'Board Games' });
			})
			.catch(err => {
				console.error('Error fetching games:', err);
				res.render('index', { games: [], title: 'Board Games' });
			});
	}
};

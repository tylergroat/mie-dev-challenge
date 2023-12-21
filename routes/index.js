// routes/index.js

module.exports = {
	getHomePage: async (req, res) => {
		let connection;

		try {
			connection = await pool.getConnection();

			const [games, gameSessions] = await Promise.all([
				connection.query('SELECT * FROM Games'),
				connection.query('SELECT * FROM GameSessions'),
			]);

			// Combine gameSessions with game information
			const gameSessionsWithGameInfo = gameSessions.map(session => {
				const game = games.find(g => g.game_id === session.game_id);
				return { ...session, game };
			});

			res.render('index', { games, gameSessions: gameSessionsWithGameInfo, title: 'Board Games' });
		} catch (err) {
			console.error('Error fetching data:', err);
			res.render('index', { games: [], gameSessions: [], title: 'Board Games' });
		} finally {
			if (connection) {
				connection.release(); // Release the connection back to the pool
			}
		}
	},

	deleteGameSession: async (req, res) => {
		const { session_id } = req.params;

		try {
			await pool.query('DELETE FROM GameSessions WHERE session_id = ?', [session_id]);
			res.redirect('/');
		} catch (err) {
			console.error('Error deleting game session:', err);
			res.status(500).send('Internal Server Error');
		}
	},
};

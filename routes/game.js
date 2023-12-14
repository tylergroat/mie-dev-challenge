// routes/game.js

module.exports = {
	getAdd: (req, res) => {
		res.render('add-game.ejs', {
			title: 'Board Games | Add game'
		});
	},

	// Render the edit game form
	getEdit: (req, res) => {
		const gameId = req.params.id;

		// Use the connection pool to query the database for the selected game
		pool.getConnection()
			.then(connection => {
				return connection.query('SELECT * FROM Games WHERE game_id = ?', [gameId]);
			})
			.then(game => {
				if (game.length === 0) {
					res.redirect('/'); // Redirect to home if the game is not found
				} else {
					res.render('edit-game', { game: game[0], title: 'Board Games | Edit Game' }); // Pass the fetched game and title to the EJS template
				}
			})
			.catch(err => {
				console.error('Error fetching game for edit:', err);
				res.redirect('/');
			})
			// .finally(() => {
			// 	connection.release(); // Release the connection back to the pool
			// })
			;
	},

	postAdd: (req, res) => {
		// Extract game information from the form submission
		const { title, description, minPlayers, maxPlayers } = req.body;

		// Use the connection pool to insert a new game into the database
		pool.getConnection()
			.then(connection => {
				return connection.query(
					'INSERT INTO Games (title, description, min_players, max_players) VALUES (?, ?, ?, ?)',
					[title, description, minPlayers, maxPlayers]
				);
			})
			.then(() => {
				console.log('Game added successfully');
				res.redirect('/'); // Redirect to the home page after adding a game
			})
			.catch(err => {
				console.error('Error adding game:', err);
				res.redirect('/add-game'); // Redirect to the add-game page in case of an error
			})
			// .finally(() => {
			// 	connection.release(); // Release the connection back to the pool
			// })
			;
	},
	// Process the edit game form submission
	postEdit: (req, res) => {
		const gameId = req.params.id;
		const { title, description, minPlayers, maxPlayers } = req.body;

		// Use the connection pool to update the game in the database
		pool.getConnection()
			.then(connection => {
				return connection.query('UPDATE Games SET title=?, description=?, min_players=?, max_players=? WHERE game_id=?',
					[title, description, minPlayers, maxPlayers, gameId]);
			})
			.then(() => {
				res.redirect('/'); // Redirect to home after editing
			})
			.catch(err => {
				console.error('Error editing game:', err);
				res.redirect('/');
			})
			// .finally(() => {
			// 	connection.release(); // Release the connection back to the pool
			// })
			;
	},
	// Handle the delete game operation
	postDelete: (req, res) => {
		const gameId = req.params.id;

		// Use the connection pool to delete the game from the database
		pool.getConnection()
			.then(connection => {
				return connection.query('DELETE FROM Games WHERE game_id = ?', [gameId]);
			})
			.then(() => {
				res.redirect('/'); // Redirect to home after deleting
			})
			.catch(err => {
				console.error('Error deleting game:', err);
				res.redirect('/');
			})
			// .finally(() => {
			// 	connection.release(); // Release the connection back to the pool
			// })
			;
	}
};

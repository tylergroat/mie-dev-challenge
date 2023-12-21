// routes/game_session.js

module.exports = {
  getAdd: async (req, res) => {
    let connection;

    try {
      // Fetch available games to populate the dropdown
      connection = await pool.getConnection();
      const games = await connection.query('SELECT game_id, title FROM Games');

      res.render('add-game-session.ejs', {
        title: 'Board Games | Add Game Session',
        games,
      });
    } catch (err) {
      console.error('Error fetching games for session add:', err);
      res.redirect('/');
    } finally {
      if (connection) {
        connection.release(); // Release the connection back to the pool
        console.log('Connection released - getAdd in game_session.js');
      }
    }
  },

  // Process the form submission for adding a game-playing session
  postAdd: async (req, res) => {
    let connection;
    const { gameId, datePlayed, attendees, comments } = req.body;

    try {
      connection = await pool.getConnection();

      // Insert a new game session into the 'GameSessions' table
      await connection.query(
        'INSERT INTO GameSessions (game_id, date_played, attendees, comments) VALUES (?, ?, ?, ?)',
        [gameId, datePlayed, attendees, comments]
      );

      console.log('Game session added successfully');
      res.redirect('/'); // Redirect to the home page after adding a game session successfully
    } catch (err) {
      console.error('Error adding game session:', err);
      res.redirect('/add-game-session'); // Redirect to the add-game-session page in case of an error
    } finally {
      if (connection) {
        connection.release(); // Release the connection back to the pool
        console.log('Connection released - postAdd in game_session.js');
      }
    }
  },

  // Delete a game session
  deleteGameSession: async (req, res) => {
    const { session_id } = req.params;
    let connection;

    try {
      connection = await pool.getConnection();

      // Delete the game session from the 'GameSessions' table
      await connection.query('DELETE FROM GameSessions WHERE session_id = ?', [session_id]);

      console.log('Game session deleted successfully');
      res.redirect('/');
    } catch (err) {
      console.error('Error deleting game session:', err);
      res.redirect('/');
    } finally {
      if (connection) {
        connection.release(); // Release the connection back to the pool
        console.log('Connection released - deleteGameSession in game_session.js');
      }
    }
  },
};

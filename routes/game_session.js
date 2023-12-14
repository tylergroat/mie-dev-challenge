// routes/game_session.js

module.exports = {
  getAdd: (req, res) => {
    let connection;
    // Fetch available games to populate the dropdown
    pool.getConnection()
      .then(conn => {
        connection = conn;
        return connection.query('SELECT game_id, title FROM Games');
      })
      .then(games => {
        res.render('add-game-session.ejs', {
          title: 'Board Games | Add Game Session',
          games,
        });
      })
      .catch(err => {
        console.error('Error fetching games for session add:', err);
        res.redirect('/');
      })
      .finally(() => {
        if (connection) {
          connection.release(); // Release the connection back to the pool
          console.log('connection released - getAdd in game_session.js');

        }
      })
      ;
  },

  // Process the form submission for adding a game-playing session
  postAdd: (req, res) => {
    let connection;
    const { gameId, datePlayed, attendees, comments } = req.body;
    pool.getConnection()
      .then(conn => {
        connection = conn;
        // Insert a new game session into the 'GameSessions' table
        return connection.query(
          'INSERT INTO GameSessions (game_id, date_played, attendees, comments) VALUES (?, ?, ?, ?)',
          [gameId, datePlayed, attendees, comments]
        );
      })
      .then(() => {
        console.log('Game session added successfully');
        res.redirect('/'); // Redirect to the home page after adding a game session successfully
      })
      .catch(err => {
        console.error('Error adding game session:', err);
        res.redirect('/add-game-session'); // Redirect to the add-game-session page in case of an error
      })
      .finally(() => {
        if (connection) {
          connection.release(); // Release the connection back to the pool
          console.log('connection released - postAdd in game_session.js');

        }
      })
      ;
  },
};
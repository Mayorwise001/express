const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
require('dotenv').config();

/* GET home page. */
router.get('/', async (req, res) => {
  try {
      const { search } = req.query;
      let query = 'SELECT * FROM users';
      const queryParams = [];

      if (search) {
          query += ' WHERE username ILIKE $1';
          queryParams.push(`%${search}%`);
      }

      const result = await pool.query(query, queryParams);
      res.render('index', { users: result.rows });
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
});


// Database connection configuration
// const pool = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
// });

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

pool.connect((err)=>{
  if (err) throw err
  console.log("Connection to PostgreSQL successful")
})



router.get('/new', (req, res) => {
  res.render('new');
});

// Route to handle form submission and save the username
router.post('/new',  async (req, res) => {
  const username = req.body.username;
  console.log("Username to be saved: ", username);
  
  // Here, you would typically save the username to the database.
  // For now, we're just logging it to the console.

  try {
    const queryText = 'INSERT INTO users (username) VALUES ($1) RETURNING *';
    const values = [username];
    const result = await pool.query(queryText, values);
    console.log('Saved to database:', result.rows[0]);

    res.redirect('/users');
} catch (err) {
    console.error('Error saving username:', err);
    res.status(500).send('Server Error');
}
});

// Route to display saved usernames
router.get('/users', async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
      res.render('users', { users: result.rows });
  } catch (err) {
      console.error('Error retrieving users:', err);
      res.status(500).send('Server Error');
  }
});

router.get('/delete', async (req, res) => {
  try {
      await pool.query('DELETE FROM users');
      console.log('All users have been deleted');
      res.redirect('/');
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
});

module.exports = router;

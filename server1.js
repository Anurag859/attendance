const express = require('express');
const mysql = require('mysql');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "acer",
  database: "my_form_db"
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.get('/data', (req, res) => {
  const { course } = req.query;

  if (!course || !/^[a-zA-Z0-9_]+$/.test(course)) {
    res.status(400).send('Invalid course parameter');
    return;
  }

  const query = `SELECT ?? FROM form_data ORDER BY id DESC LIMIT 1; `;
  db.query(query, [course], (err, result) => {
    if (err) {
      console.error('Error retrieving data from MySQL:', err);
      res.status(500).send('Error retrieving data from MySQL');
      return;
    }
    if (result.length > 0 && result[0][course]) {
      res.send(result[0][course]);
    } else {
      res.status(404).send('No data found');
    }
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'next.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

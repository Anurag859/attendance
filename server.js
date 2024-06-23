/*require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Create a connection to the database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "acer",
  database: "my_form_db"
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Route to serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to handle form submission
app.post('/submit', (req, res) => {
  const { FYCS, SYCS, TYCS } = req.body;
  const query = 'INSERT INTO form_data (FYCS, SYCS, TYCS) VALUES (?, ?, ?)';
  db.query(query, [FYCS, SYCS, TYCS], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error saving form data');
      return;
    }
    res.status(201).send('Form data saved successfully');
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
*/



require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { spawn } = require('child_process'); // Import child_process module

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Create a connection to the database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "acer",
  database: "my_form_db"
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Route to serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to handle form submission
app.post('/submit', (req, res) => {
  const { FYCS, SYCS, TYCS } = req.body;
  const query = 'INSERT INTO form_data (FYCS, SYCS, TYCS) VALUES (?, ?, ?)';
  db.query(query, [FYCS, SYCS, TYCS], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error saving form data');
      return;
    }
    res.status(201).send('Form data saved successfully');
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  
  // Automatically start server1.js
  const server1 = spawn('node', [path.join(__dirname, 'server1.js')], {
    stdio: 'inherit' // Inherit stdio so that logs are shown in the same terminal
  });

  server1.on('close', (code) => {
    console.log(`server1.js exited with code ${code}`);
  });
});

const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database(':memory:');

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize database
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS survey (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        dob TEXT NOT NULL,
        contact_number TEXT NOT NULL,
        favorite_food TEXT NOT NULL,
        movies INTEGER NOT NULL,
        radio INTEGER NOT NULL,
        eat_out INTEGER NOT NULL,
        tv INTEGER NOT NULL
    )`);
});

// Routes
app.get('/', (req, res) => {
    res.render('survey_form');
});

app.post('/submit', (req, res) => {
    const { name, email, dob, contact_number, favorite_food, movies, radio, eat_out, tv } = req.body;
    const favorite_foods = Array.isArray(favorite_food) ? favorite_food.join(',') : favorite_food;

    db.run(`INSERT INTO survey (name, email, dob, contact_number, favorite_food, movies, radio, eat_out, tv) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, email, dob, contact_number, favorite_foods, movies, radio, eat_out, tv], (err) => {
            if (err) {
                return res.status(500).send("Database insertion error");
            }
            res.redirect('/results');
        });
});

app.get('/results', (req, res) => {
    db.all(`SELECT COUNT(*) AS total_surveys, AVG(julianday('now') - julianday(dob)) / 365.25 AS avg_age, MAX(julianday('now') - julianday(dob)) / 365.25 AS oldest_age, MIN(julianday('now') - julianday(dob)) / 365.25 AS youngest_age FROM survey`, [], (err, rows) => {
        if (err) {
            return res.status(500).send("Database query error");
        }
        const stats = rows[0];

        db.all(`SELECT
            (SELECT COUNT(*) FROM survey WHERE favorite_food LIKE '%Pizza%') * 100.0 / COUNT(*) AS pizza_percentage,
            (SELECT COUNT(*) FROM survey WHERE favorite_food LIKE '%Pasta%') * 100.0 / COUNT(*) AS pasta_percentage,
            (SELECT COUNT(*) FROM survey WHERE favorite_food LIKE '%Pap and Wors%') * 100.0 / COUNT(*) AS pap_and_wors_percentage,
            AVG(movies) AS avg_movies,
            AVG(radio) AS avg_radio,
            AVG(eat_out) AS avg_eat_out,
            AVG(tv) AS avg_tv
            FROM survey`, [], (err, rows) => {
            if (err) {
                return res.status(500).send("Database query error");
            }
            const percentages = rows[0];
            res.render('results', { ...stats, ...percentages });
        });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
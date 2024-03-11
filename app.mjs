import express from 'express';
import Database from 'better-sqlite3';

const app = express();
app.use(express.static('public'));
const db = new Database('wadsongs.db');

app.use(express.json());

const PORT = 3000;

// Search for artists from the wadsongs database
app.get('/billboard/artist/:artist', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM wadsongs WHERE artist = ?');
        const results = stmt.all(req.params.artist);
        res.json(results);
    } catch (error) {
        res.status(500).json( {error : error });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});


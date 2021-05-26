const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
//need to bring in pg
const pg = require('pg');
//need to configure pg
const Pool = pg.Pool;
//create pool to use
const pool = new Pool ({
    database: 'jazzy_sql',
    host: 'localhost',
    port: 5432,
});

pool.on('connect', () => {
    console.log('CONNECTED TO POSTGRES');
});

pool.on('error', (error) => {
    console.log(error);
});


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});


app.get('/artist', (req, res) => {
    //need to retrieve all songs from database
    const queryArtist= `SELECT * FROM "artist" ORDER BY "birthdate" DESC;`

    //need to get query from database
    pool.query(queryArtist)
    .then( (result) => {
        console.log(result.rows);
        res.send(result.rows);

    }).catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    })
});




app.post('/artist', (req, res) => {
    
    let queryText = `INSERT INTO "artist" ("name", "birthdate") 
    VALUES ($1, $2)`;

    let artistValues = [req.body.name, req.body.birthdate];

    pool.query(queryText, artistValues) 
    .then( (result) => {
        res.sendStatus(201);
    }).catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    })
});

app.get('/song', (req, res) => {
    const querySongs = `SELECT * FROM "song" ORDER BY "title";` 

    pool.query(querySongs)
    .then( (result) => {
        console.log(result.rows);
        res.send(result.rows);
    })
});

app.post('/song', (req, res) => {
    
    let querySongs = `INSERT INTO "song" ("title", "length", "released")
    VALUES ($1, $2, $3);`

    let songValues = [req.body.title, req.body.length, req.body.released];

    pool.query(querySongs, songValues)
    .then( (result) => {
        res.sendStatus(201);
    }).catch ( (err) => {
        console.log(err);
        res.sendStatus(500);
    })
});



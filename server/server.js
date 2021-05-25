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
    console.log(`In /songs GET`);
    res.send(artistList);
});

app.post('/artist', (req, res) => {
    artistList.push(req.body);
    res.sendStatus(201);
});

app.get('/song', (req, res) => {
    console.log(`In /songs GET`);
    res.send(songList);
});

app.post('/song', (req, res) => {
    songList.push(req.body);
    res.sendStatus(201);
});



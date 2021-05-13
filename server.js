//========DENDPENDENCIES=============
//===require
const express = require('express');
const path = require('path');
const fs = require('fs');


const app = express()
const PORT = process.env.PORT || 7540;

//====sets up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//====ROUTES


//===send notes.html file
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.json(notes)
});
//========read by id
app.get("/api/notes/:id", (req, res) => {
    res.json(notes[req.params.id]);
});

//=======delete by id
app.delete("api/notes/:id", (req, res) => {
    res.json(notes[req.params.id]);
});

app.listen(PORT, () => console.log(`We chopping it up on PORT ${PORT}`));


//====FIND OUT WHAT GOES INSIDE THIS READFILE FUNCTION

// read JSON object from file
// fs.readFile('./db/db.json', 'utf-8', (err, data) => {
//     if (err) {
//         throw err;
//     }

//     // parse JSON object
//     const notes = JSON.parse(data.toString());

// });
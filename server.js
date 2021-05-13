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
app.use(express.static("public"));


//===============ROUTES
const FileManager = require("./db/FileManager")

//======api routes
// app.get("/api/notes", (req, res) => {
//     FileManager.get(function (notes) {
//         res.json(notes)
//     })
// });
// app.get("/api/notes", (req, res) => {
//     FileManager.get()
//         .then(function (notes) {
//             res.json(notes)
//         })
//         .catch(function (err) {
//             res.status(500).send(err);
//         })
// });
app.get("/api/notes", async (req, res) => {
    try {
        const notes = await FileManager.get()
        res.json(notes)
    } catch (error) {
        res.status(500).send(error);
    }
});
//read by id
app.post("/api/notes", async (req, res) => {
    try {
        await FileManager.create(req.body)
        res.sendStatus(200)
    } catch (error) {
        res.status(500).send(error);
    }
});
//delete by id
app.delete("/api/notes/:id", async (req, res) => {
    try {
        await FileManager.deleteById(req.params.id)
        res.sendStatus(200)
    } catch (error) {
        res.status(500).send(error);
    }
});

//======notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});



//==============SERVER LISTEN
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
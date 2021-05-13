const path = require("path")
const fs = require("fs")
const file_path = path.join(__dirname, "db.json");

// function get(cb) {
//     fs.readFile(file_path, "utf8", function (err, data) {
//         if (err) throw err;
//         cb(JSON.parse(data))
//     })
// }
function get() {
    return new Promise(function (resolve, reject) {
        fs.readFile(file_path, "utf8", function (err, data) {
            if (err) return reject(err)
            resolve(JSON.parse(data))
        })
    })
}
function create(newNote) {
    return new Promise(async function (resolve, reject) {
        try {
            const notes = await get();

            // newNote.id = notes.length + 1;
            newNote.id = await newId();

            notes.push(newNote);
            await save(notes);
            resolve(true);
        } catch (error) {
            reject(error);
        }
    })
}
function deleteById(id) {
    return new Promise(async function (resolve, reject) {
        try {
            const notes = await get();

            // const newNotes = [];
            // for (const note of notes) {
            //     if (note.id != id) newNotes.push(note)
            // }
            // await save(newNotes);

            const index = notes.findIndex(n => n.id == id);
            notes.splice(index, 1);
            await save(notes);
            
            resolve(true);
        } catch (error) {
            reject(error);
        }
    })
}

//===writes json file whenever a note is added and/or deleted
function save(newDb) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(file_path, JSON.stringify(newDb), function (error) {
            if (error) reject(error);
            resolve(true);
        })
    })
}
function newId() {
    return new Promise(async function (resolve, reject) {
        try {
            const notes = await get();
            // resolve(notes[notes.length - 1].id + 1)
            //try block code
            var returnId = 0
            if(notes.length){
             returnId = notes[notes.length - 1].id + 1
            } else {
             returnId = 1
            }
            resolve(returnId)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    get,
    create,
    deleteById
}

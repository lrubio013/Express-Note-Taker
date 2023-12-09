const express = require("express");
const path = require("path");
const app = express();
const uniqid = require("uniqid");
const PORT = process.env.PORT || 3001;
const { readFile, writeFile } = require("fs").promises

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// Getting the html route for index.html
app.get("*", (re, res) => { 
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

//Getting the html route for notes.html
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Reads db.json file and sends back the parsed jsondata
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

//Post users note after parsing it and then turning it to a string
app.post("api/notes", async (req,res) => {
    const noteData = await readFile("./db/db.json", "utf8")
    const parsedNote = JSON.parse(noteData);
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uniqid()
    }
    parsedNote.push(newNote);
    await writeFile("./db/db.json", JSON.stringify(parsedNote));
    res.json("note saved")
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});
const express = require("express");
const path = require("patrh");
const app = express()

const PORT = process.env.PORT || 3001;

app.use(express.static("public"));

app.get("*", (re, res) => { 
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);
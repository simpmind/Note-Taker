const path = require("path");

// return the notes page and homepage  use sendFile() and get request 
module.exports = function (app) {
  // get notes page
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname + "/../public/notes.html"));
  });

// get landing page
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/../public/index.html"));
  });
};
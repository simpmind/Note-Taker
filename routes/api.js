
// Dependencies to read json
const fs = require("fs");

// installed unique Id package from npm
var uniqid = require("uniqid");
const path = require('path');


module.exports = function (app) {
  // API GET Requests
  app.get("/api/notes", (req, res) => {
    console.log("Execute GET notes request");

    // Read the db.json file using readFileSync
    let data = fs.readFileSync("./db/db.json", "utf8");
    
    // Send response of json data of GET request
    res.json(JSON.parse(data));
  });

  // API POST Requests
  app.post("/api/notes", (req, res) => {
    // store new notes from body with req.body and id into an object
    const newNote = {
      ...req.body,
      id: uniqid(),
    };

    console.log("Post Request for new notes");

    //  Read data from JSON file
    let data = fs.readFileSync("./db/db.json", "utf8");

    const dataJSON = JSON.parse(data);

    // Pushed new note in notes file 'db.json'
    dataJSON.push(newNote);

    // Write notes data to 'db.json' file
    fs.writeFile(
      "./db/db.json",
      JSON.stringify(dataJSON),
      (err, text) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("HELLO", text);
      }
    );

    console.log("Success, added a new note");

    // send json data response
    res.json(data);
  });

  //   API DELETE Request
  app.delete("/api/notes/:id", (req, res) => {
    // read file
    let data = fs.readFileSync("./db/db.json", "utf8");

    // variable for setting up the filter method
    const dataJSON = JSON.parse(data);
    
    const newNotes = dataJSON.filter((note) => {
      return note.id !== req.params.id;
    });
    // console.log(req.params)
     
    fs.writeFile( "./db/db.json",JSON.stringify(newNotes),(err, text) => {
        if (err) {
          console.error(err);
          return;
        }
      });

    res.json(newNotes);
  });
};
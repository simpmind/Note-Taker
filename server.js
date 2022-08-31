const express = require('express');
const path = require('path');


const PORT = process.env.port || 3001;
const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname + '/public')));

require("./routes/api.js")(app);

require("./routes/homepage.js")(app);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
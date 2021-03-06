const express = require('express');

//const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
//const User = require('./models/index.js');

const PORT = process.env.PORT || 8000;

const app = express();
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

require("./routes/api.js")(app);
require("./routes/view.js")(app);


app.listen(PORT, () => {
  console.log(`this app is listening at http://localhost:${PORT}`);
});
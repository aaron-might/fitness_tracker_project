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

const URI = process.env.MONGODB_URI || "mongodb://localhost/workout"

mongoose.connect(URI, {
  useUnifiedTopology:true,
  useNewUrlParser:true,
  useFindAndModify:false
})



// app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
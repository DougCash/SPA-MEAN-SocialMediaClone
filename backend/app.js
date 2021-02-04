const path = require ('path')
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

//Setting up a router to handle selection of controllers
const postsRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')

const app = express();

//Want to be able to read json data from the responses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set up folder drops and paths
app.use("/images", express.static(path.join(__dirname,"images")));
app.use("/", express.static(path.join(__dirname,"angular")));

//Need to pull these credentials out and get em into some form of a .env file.
mongoose
.connect("mongodb+srv://admin:JClxzdCVJu7iHt7z@udemymean.xfnoz.mongodb.net/udemy-mean?retryWrites=true&w=majority")
.then(() => {
  console.log('Connected to Database!');
}).catch(() => {
  console.log('Connection to Database Failed!')
});

//Headers needed to allow frontend and backend to talk
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
})

//Actually use the routes initialized above
app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

//Whatever the response is, let's render it!
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname,"angular","index.html"));
});


module.exports = app;

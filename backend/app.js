const path = require ('path')
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const postsRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname,"images")));
app.use("/", express.static(path.join(__dirname,"angular")));

mongoose
.connect("mongodb+srv://admin:JClxzdCVJu7iHt7z@udemymean.xfnoz.mongodb.net/udemy-mean?retryWrites=true&w=majority")
.then(() => {
  console.log('Connected to Database!');
}).catch(() => {
  console.log('Connection to Database Failed!')
});

// app.use((req,res,next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
//   next();
// })

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname,"angular","index.html"));
});


module.exports = app;

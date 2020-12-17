const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const path = require ('path')
const postsRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')
const dotenv = require('dotenv')

const app = express();

app.use(bodyParser.json());
//below not going to be used, just adding as reminder that it exists.
//app.use(bodyParser.urlencoded({extended: false }));

dotenv.config()

app.use("/images", express.static(path.join("backend/images")));
console.log(process.env.MONGO_ATLAS_PW)
mongoose.connect("mongodb+srv://admin:JClxzdCVJu7iHt7z@udemymean.xfnoz.mongodb.net/udemy-mean?retryWrites=true&w=majority").then(() => {
  console.log('Connected to Database!');
}).catch(() => {
  console.log(process.env.MONGO_ATLAS_PW)
  console.log('Connection to Database Failed!')
});

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
})

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);


module.exports = app;

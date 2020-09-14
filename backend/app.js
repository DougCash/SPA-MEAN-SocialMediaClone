const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose')

const app = express();

app.use(bodyParser.json());
//below not going to be used, just adding as reminder that it exists.
//app.use(bodyParser.urlencoded({extended: false }));

mongoose.connect("mongodb+srv://admin:JClxzdCVJu7iHt7z@udemymean.xfnoz.mongodb.net/udemy-mean?retryWrites=true&w=majority").then(() => {
  console.log('Connected to Database!');
}).catch(() => {
  console.log('Connection to Database Failed!')
});

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
})



app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postID: createdPost._id
    });
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts: documents
    });
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id}).then(result => {
    res.status(200).json({ message: "Post deleted"});
  });
});

module.exports = app;

//Encryption
const bcrypt = require('bcryptjs');
//Sending sensitive info
const jwt = require('jsonwebtoken');
//Database model
const User = require("../models/user");

//Create User
exports.createUser = (req, res, next) => {
  //Hash to protect PW
    bcrypt.hash(req.body.password, 10).then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      //Save result and report success
      user.save().then(result => {
        res.status(201).json({
          message: 'User created!',
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
            message: "Invalid authentication credentials!"
          });
      });
    });
  }

//User Login  
exports.userLogin = (req, res, next) => {
    let fetchedUser;
    //Check for email, if not there, fails
    User.findOne({ email: req.body.email }).then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Authentiation failed."
        });
      }
      //If we have an email, then let's check their provided PW
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      //If the result of that above comparison is an error, then the password doesn't match
      if (!result) {
        return res.status(401).json({
          message: "Authentication failed."
        });
      }
      //If they're signed in, let's give them the ability to remain signed in through cookies
      //Using JWT here again for this information
      const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, "secret_this_should_be_longer", { expiresIn: "1h"});
      res.status(200).json({
        message: "Logged in successfully!",
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    //Catch all other errors
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
  }
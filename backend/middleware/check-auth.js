
//Want to secure the 'payload' (json contains user information)
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  //Try/Catch since if it isn't verified, it'll throw an error
  try {
    const token = req.headers.authorization.split(" ")[1];
    //Need to pull this cypher key out and put it into a .env file
    const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
    req.userData = {email: decodedToken.email, userId: decodedToken.userId };
    console.log(req.userData)
    next();
  } catch (error) {
    res.status(401).json({
      message: "You are not authenticated!",
    });
  }
};

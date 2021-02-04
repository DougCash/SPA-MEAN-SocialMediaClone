const express = require("express");

//Import Controller
const UserController = require("../controllers/user")

//Router to handle routing the controller
const router = express.Router();

//Direct to the appropriate controller funtionality
router.post("/signup", UserController.createUser);
router.post("/login", UserController.userLogin);

module.exports = router;

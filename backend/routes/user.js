const { ModuleWithComponentFactories } = require("@angular/core");
const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require("../models/user");

const UserController = require("../controllers/user")

const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login", UserController.userLogin);

module.exports = router;

const express = require("express");
const { signup } = require("../controllers/Auth.Controller.js");

const AuthRoute = express.Router();

AuthRoute.post("/signup",signup);

module.exports = {
    AuthRoute
}
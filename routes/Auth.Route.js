const express = require("express");
const { signup, signin } = require("../controllers/Auth.Controller.js");

const AuthRoute = express.Router();

AuthRoute.post("/signup",signup);
AuthRoute.post("/signin",signin);

module.exports = {
    AuthRoute
}
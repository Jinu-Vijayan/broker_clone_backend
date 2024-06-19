const express = require("express");
const { signup, signin, signout } = require("../controllers/Auth.Controller.js");

const AuthRoute = express.Router();

AuthRoute.post("/signup",signup);
AuthRoute.post("/signin",signin);
AuthRoute.get("/signout",signout);

module.exports = {
    AuthRoute
}
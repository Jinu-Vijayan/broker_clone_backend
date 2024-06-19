const express = require("express");
const { updateUser, deleteUser } = require("../controllers/User.Controller.js");
const { Auth } = require("../middleware/Auth.js");

const UserRoute = express.Router();

UserRoute.post('/update/:id',Auth,updateUser);
UserRoute.delete('/delete/:id',Auth,deleteUser);

module.exports = {
    UserRoute
}
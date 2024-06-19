const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : [true, "userName is a required field"],
        unique : true
    },
    email : {
        type : String,
        required : [true, "email is a required field"],
        unique : true
    },
    password : {
        type : String,
        required : [true, "password is requied field"]
    }
},
{
    timestamps : true
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
    UserModel
}
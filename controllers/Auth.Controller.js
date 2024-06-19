const { UserModel } = require("../models/User.Model");
const bcrypt = require("bcrypt")

const signup = async (req,res,next) =>{
    try{
        const {userName, email, password} = req.body;

        if(!userName || !email || !password){
            return res.status(400).json({
                message : "Send all required data"
            })
        }

        const hashedPassword = bcrypt.hashSync(password,10);

        const newUser = new UserModel({
            ...req.body,
            password : hashedPassword
        })

        await newUser.save();

        res.status(201).json({
            message : "user created"
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    signup
}
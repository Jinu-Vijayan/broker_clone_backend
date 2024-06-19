const { ErrorHandler } = require("../middleware/ErrorHandler");
const { UserModel } = require("../models/User.Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
            success : true,
            message : "user created"
        })
    } catch (err) {
        next(err);
    }
}

const signin = async (req,res,next) => {

    try{

        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
        const {email, password} = req.body;
        const validUser = await UserModel.findOne({email});

        if(!validUser){
            return next(ErrorHandler(401,"Wrong Credentials"))
        }

        const validPassword = bcrypt.compareSync(password,validUser.password);

        if(!validPassword){
            
            return next(ErrorHandler(401,"Wrong Credentials"))
        }

        const token = jwt.sign({
            id : validUser._id
        },JWT_SECRET_KEY);

        const {password:pass, ...userData} = validUser._doc

        res.cookie("access_token" , token, {httpOnly: true}).status(200).json({
            success : true,
            message : "Sign in successful",
            validUser : userData
        })

    }catch(err){
        next(err)
    }

}

const signout = async (req,res,next) => {
    try{
        res.clearCookie("access_token");
        res.status(200).json({
            success : true,
            message : "User logged out"
        })
    }catch(err){
        next(err)
    }
}

module.exports = {
    signup,
    signin,
    signout
}
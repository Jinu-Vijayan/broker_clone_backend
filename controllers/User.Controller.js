const { ErrorHandler } = require("../middleware/ErrorHandler");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/User.Model");

const updateUser = async (req,res,next) => {
    try{
        if(req.user.id !== req.params.id){
            return next(ErrorHandler(401,"You can only update your own profile"));
        }

        if(req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password,10);
        };

        const updateUser = await UserModel.findByIdAndUpdate(req.params.id,{
            $set : {
                userName : req.body.userName,
                email : req.body.email,
                password : req.body.password
            }
        },{new : true});

        const {password: pass, ...userData} = updateUser._doc;

        res.status(200).json({
            success : true,
            message : "User data updated",
            userData
        });

    }catch(err){
        next(err);
    }
}

const deleteUser = async (req,res,next) => {

    if(req.user.id != req.params.id){
        return next(ErrorHandler(401,"You can only delete your own account"));
    }

    try{

        await UserModel.findByIdAndDelete(req.params.id)

        res.clearCookie("access_token");
        res.status(200).json({
            success : true,
            message : "User has been deleted"
        });

    }catch(err){
        next(err)
    }
}

module.exports = {
    updateUser,
    deleteUser
}
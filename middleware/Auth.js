const { ErrorHandler } = require("./ErrorHandler");
const jwt = require("jsonwebtoken");

const Auth = (req,res,next) => {
    const token = req.cookies.access_token

    if(!token){
        return next(ErrorHandler(401,"Unauthorized"));
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY,(err, user) => {
        if(err){
            return next(ErrorHandler(403,"Forbidden"));
        }

        req.user = user;
        next();
    });
}

module.exports = {
    Auth
}
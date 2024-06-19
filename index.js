const express = require("express");
const mongoose = require("mongoose");
const { UserRoute } = require("./routes/User.Route.js");
const { AuthRoute } = require("./routes/Auth.Route.js");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 10000;
const MONGO_URI = process.env.MONGO_URI;

// Middle ware
app.use(express.json());

mongoose.connect(`${MONGO_URI}/broker`)
.then(()=>{
    console.log("Connected to data base");
})
.catch(err=>{
    console.log("Error occured while connecting to data base");
});

app.use("/api/user",UserRoute);
app.use("/api/auth",AuthRoute);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error occured";
    
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message
    });
});

app.use("/*",(req,res)=>{
    res.status(404).json({
        message : "Route not found"
    });
});

app.listen(PORT,()=>{
    console.log("Server is running on port", PORT)
});
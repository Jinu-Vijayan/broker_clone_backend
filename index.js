const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 10000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(`${MONGO_URI}/broker`)
.then(()=>{
    console.log("Connected to data base");
})
.catch(err=>{
    console.log("Error occured while connecting to data base");
});

app.listen(PORT,()=>{
    console.log("Server is running on port", PORT)
});
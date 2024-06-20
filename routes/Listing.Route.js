const express = require("express");
const { createListing } = require("../controllers/Listing.Controller.js");
const { Auth } = require("../middleware/Auth.js");
const {upload} = require("../services/fileUpload.js")

const ListingRouter = express.Router();

ListingRouter.post("/create",Auth,upload.array("images",6),createListing);

module.exports = {
    ListingRouter
}
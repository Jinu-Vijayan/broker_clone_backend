const express = require("express");
const { createListing, deleteListing } = require("../controllers/Listing.Controller.js");
const { Auth } = require("../middleware/Auth.js");
const {upload} = require("../services/fileUpload.js")

const ListingRouter = express.Router();

ListingRouter.post("/create",Auth,upload.array("images",6),createListing);
ListingRouter.delete("/delete/:id",Auth,deleteListing);

module.exports = {
    ListingRouter
}
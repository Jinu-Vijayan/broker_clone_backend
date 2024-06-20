const express = require("express");
const { createListing, deleteListing ,updateListing, getListingById, getAllListings } = require("../controllers/Listing.Controller.js");
const { Auth } = require("../middleware/Auth.js");
const {upload} = require("../services/fileUpload.js")

const ListingRouter = express.Router();

ListingRouter.post("/create",Auth,upload.array("images",6),createListing);
ListingRouter.delete("/delete/:id",Auth,deleteListing);
ListingRouter.post("/update/:id",Auth,upload.array("images",6),updateListing);
ListingRouter.get("/get/:id",getListingById);
ListingRouter.get("/get",getAllListings);

module.exports = {
    ListingRouter
}
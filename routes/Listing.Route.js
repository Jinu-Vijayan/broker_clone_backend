const express = require("express");
const { createListing } = require("../controllers/Listing.Controller.js");
const { Auth } = require("../middleware/Auth.js");

const ListingRouter = express.Router();

ListingRouter.post("/create",Auth,createListing);

module.exports = {
    ListingRouter
}
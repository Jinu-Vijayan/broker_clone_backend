const { ListingModel } = require("../models/Listing.Model");

const createListing = async (req,res,next) => {
    try{
        
        const newListing = await ListingModel.create(req.body);
        res.status(201).json({
            success : true,
            message : "Listing created successfuly",
            data : newListing
        })
    }catch(err){
        next(err);
    }
};

module.exports = {
    createListing
}
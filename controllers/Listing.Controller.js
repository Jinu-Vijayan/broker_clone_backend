const { ListingModel } = require("../models/Listing.Model");
const {uploadFiles} = require("../services/fileUpload.js")

const createListing = async (req,res,next) => {
    try{

        const results = await uploadFiles(req);

        const imageUrls = [];
        for(const data of results){
            imageUrls.push(data.secure_url)
        };

        req.body.imageUrls = imageUrls;
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
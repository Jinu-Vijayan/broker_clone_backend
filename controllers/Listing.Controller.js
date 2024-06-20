const { ErrorHandler } = require("../middleware/ErrorHandler.js");
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
        req.body.userRef = req.user.id;
        const newListData = {...req.body};

        const newListing = await ListingModel.create(newListData);
        res.status(201).json({
            success : true,
            message : "Listing created successfuly",
            data : newListing
        })
    }catch(err){
        next(err);
    }
};

const deleteListing = async (req,res,next) => {
    try{

        const {id} = req.params
        const listing = await ListingModel.findById(id);

        if(!listing){
            return next(ErrorHandler(404,"Listing not found"))
        }
        console.log(req.user.id, listing.userRef)
        if(req.user.id !== listing.userRef.toString()){
            return next(ErrorHandler(401,"You can only delete your own listings"));
        }

        await ListingModel.findByIdAndDelete(id);

        res.status(200).json({
            success : true,
            message : "Listing deleted"
        })

    }catch(err){
        next(err);
    }
}

const updateListing = async (req,res,next) => {

    try{

        const {id} = req.params;

        const listing = await ListingModel.findById(id);

        if(!listing){
            return next(ErrorHandler(404, "Listing not found"));
        };

        if(req.user.id !== listing.userRef.toString()){
            return next(ErrorHandler(401,"You can only delete your own listings"));
        };

        if(req.files.length > 0){

            const results = await uploadFiles(req);
    
            const imageUrls = listing.imageUrls;
    
            for(const data of results){
                imageUrls.push(data.secure_url)
            };
    
            req.body.imageUrls = imageUrls;
            
        }

        // req.body.userRef = req.user.id;
        const updatedListData = {...req.body};

        const updatedListing = await ListingModel.findByIdAndUpdate(id,updatedListData,{new : true});

        res.status(200).json({
            success : true,
            message : "Listing updated",
            updatedListing
        })

    }catch(err){
        next(err);
    }
}

module.exports = {
    createListing,
    deleteListing,
    updateListing
}
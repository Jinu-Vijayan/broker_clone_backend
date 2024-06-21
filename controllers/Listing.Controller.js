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

        const imageUrls = listing.imageUrls;

        if(req.files.length > 0){

            const results = await uploadFiles(req);
    
            for(const data of results){
                imageUrls.push(data.secure_url)
            };
    
            
        }

        req.body.imageUrls = imageUrls;

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

const getListingById = async (req,res,next) => {
    try{

        const {id} = req.params;
        const listing = await ListingModel.findById(id);
        if(!listing){
            return next(ErrorHandler(404, "Listing not found"));
        };

        res.status(200).json({
            success : true,
            message : "Listing fetched",
            data : listing
        })

    }catch(err){
        next(err)
    }
}

const getAllListings = async (req,res,next) => {
    try{

        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        const searchTerm = req.query.searchTerm || "";
        const sort = req.query.sort || "createAt";
        const order = req.query.order || "desc";
        let offer = req.query.offer;
        let furnished = req.query.furnished;
        let parking = req.query.parking;
        let type = req.query.type;

        if(offer === undefined || offer === "false"){
            offer = {$in : [false, true]};
        }
        
        if(furnished === undefined || furnished === "false"){
            furnished = {$in : [false, true]};
        }

        if(parking === undefined || parking === "false"){
            parking = {$in : [false, true]};
        }

        if(type === undefined || type === "all"){{
            type = {$in:["sell","rent"]}
        }}

        const listing = await ListingModel.find({
            name : {$regex : searchTerm , $options : 'i'},
            offer,
            type,
            furnished,
            parking
        }).sort({
            [sort] : order
        }).limit(limit).skip(startIndex);

        return res.status(200).json({
            success : true,
            data : listing
        })


    }catch(err){
        next(err)
    }
}

module.exports = {
    createListing,
    deleteListing,
    updateListing,
    getListingById,
    getAllListings
}
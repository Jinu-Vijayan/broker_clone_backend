const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"name is a required field"]
    },
    description : {
        type : String,
        required : [true,"description is a required field"]
    },
    address : {
        type : String,
        required : [true,"address is a required field"]
    },
    regularPrice : {
        type : Number,
        required: [true,"regularPrice is a required field"]
    },
    discountedPrice : {
        type : Number,
        required : [true,"discountedPrice is a required field"]
    },
    bathRooms : {
        type : Number,
        required : [true,"bathRooms is a required field"]
    },
    bedRooms : {
        type : Number,
        required : [true,"bedRooms is a required field"]
    },
    parking : {
        type : Boolean,
        required : [true,"parking is a required field"]
    },
    offer : {
        type : Boolean,
        required : [true,"offer is a required field"]
    },
    furnished : {
        type : Boolean,
        required : [true,"furnished is a required field"]
    },
    type : {
        type : String,
        required : [true,"type is a required field"]
    },
    imageUrls : {
        type : Array,
        required : [true,"imageUrls is a required field"]
    },
    userRef : {
        type : mongoose.Schema.ObjectId,
        required : [true,"userRef is a required field"],
        ref : "users"
    }
},{
    timestamps : true
});

const ListingModel = mongoose.model("lists",listingSchema);

module.exports = {
    ListingModel
}
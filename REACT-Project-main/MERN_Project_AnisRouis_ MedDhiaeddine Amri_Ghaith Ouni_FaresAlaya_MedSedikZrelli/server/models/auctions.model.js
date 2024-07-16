const mongoose = require('mongoose');

const AuctionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minLength: [3, "Title must be at least 3 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minLength: [8, "Description must be at least 8 characters"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be at least 3 characters"]
    },
    image: {
        type: String, //Change to Buffer if you want to store image as binary data when uploaded via file upload
        required: true
    },
    isSold: {
        type: Boolean,
        default:false
    }
},
{ timestamps: true }
);


module.exports.Auction = mongoose.model('Auction', AuctionSchema);

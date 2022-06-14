const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');


const ticketSchema = new mongoose.Schema({
    assigned: {
        type: String,
        default: " ",
        maxlength: 50,
        minlength: 3,
        trim: true
    },
    category: {
        type: String,
        default: " ",
        maxlength: [20, "Invalid Category"],
        minlength: 2,
        trim:true
    },
    deviceID: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10,
        trim:true
    },
    error: {
        type: String,
        required: true,
        maxlength: 100,
        trim:true
    },
    priority: {
        type: String,
        default: "low",
        maxlength: 10,
        minlength: 1,
        trim:true
    },
    ticketID: {
        unique: true,
        trim: true,
        type: Number,
    },
    ticketStatus: {
        type: String,
        maxlength: 10,
        default: "Pending",
        trim:true
    },
    userID: {
        trim: true,
        type: Number,
        required: true
    },
    lat: {
        default: " ",
        type: String,
        trim: true
    },
    lon: {
        default: " ",
        type: String,
        trim: true
    }
},
{timestamps: true}
)


module.exports = mongoose.model("tickets", ticketSchema) 
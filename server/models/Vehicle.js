const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vehicleName: {
        type: String,
        required: true,
        trim: true
    },
    ownerName: {
        type: String,
        required: true
    },
    userEmail: { // Owner's email
        type: String,
        required: true,
        index: true
    },
    category: {
        type: String,
        required: true,
        index: true
    },
    pricePerDay: {
        type: Number,
        required: true,
        min: 0
    },
    location: {
        type: String,
        required: true,
        index: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    bookingCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// Index for sorting by price and text search if needed
vehicleSchema.index({ pricePerDay: 1 });
vehicleSchema.index({ createdAt: -1 });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;

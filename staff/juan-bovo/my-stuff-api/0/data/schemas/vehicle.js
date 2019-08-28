const mongoose = require('mongoose')
const { Schema } = mongoose
const ObjectId = mongoose.Schema.Types.ObjectId

module.exports = new Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['tourism', 'suv', 'van', 'coupe', 'cabrio', 'roadster', 'truck'],
        default: 'tourism'
    },
    color: {
        type: String,
        required: true
    },
    electric: {
        type: Boolean,
        required: true,
        default: false
    },
    plate: {
        type: String,
        required: true
    },
    extra: {
        type: String
    },
    owner: { type: ObjectId, ref: 'User' }
})
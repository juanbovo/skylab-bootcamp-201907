const mongoose = require('mongoose')

const { Schema } = mongoose
//const ObjectId = Schema.ObjectId //--> Lo pedía donde lo estaba llamando, que era en property y en vehicle

module.exports = new Schema({
    number: {
        type: String,
        required: true
    },
    expiry: {
        type: Date,
        required: true,
        match: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
    }
})
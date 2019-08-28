const mongoose = require('mongoose')
const userSchema = require('./schemas/user') // o "{ user } = require('./schemas')"
const cardSchema = require('./schemas/card')
const vehicleSchema = require('./schemas/vehicle')
const propertySchema = require('./schemas/property')

module.exports = {
    User: mongoose.model('User', userSchema),
    Card: mongoose.model('Card', cardSchema),
    Vehicle: mongoose.model('Vehicle', vehicleSchema),
    Property: mongoose.model('Property', propertySchema)
}
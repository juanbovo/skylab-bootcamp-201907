const { Vehicle } = require('../../data')
const { User } = require('../../data')


module.exports = function (brand, model, year, type, color, electric, plate, id) {
    return Vehicle.findOne({ plate })
    .then(response => {
        if (response) throw new Error('vehicle already exists')
        const vehicle = new Vehicle({
            brand, 
            model,
            year,
            type,
            color,
            electric,
            plate 
        })
        vehicle.owner = id
        return vehicle.save()
    })
    .then(() => Vehicle.findOne({ plate }))
    .then(response => {
        if (!response) throw new Error(`vehicle with plate ${plate} does not exist`)
        vehicleId = response._id.toString()
        return vehicleId
    })
}
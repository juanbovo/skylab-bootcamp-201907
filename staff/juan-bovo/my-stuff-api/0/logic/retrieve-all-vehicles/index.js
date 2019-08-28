const { Vehicle } = require('../../data')


module.exports = function(id){
    return Vehicle.find({ owner : id }, { __v: 0 }).lean()
        .then(vehicles => {
            if (!vehicles) throw Error(`user with id ${userId} does not own any car`)
            vehicles.forEach(vehicle => {
                vehicle.id = vehicle._id
                delete vehicle._id
            })
            return vehicles
        })
}
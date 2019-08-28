const { Vehicle } = require('../../data')
const { User } = require('../../data')

module.exports = function(id) {
    return Vehicle.findOne({_id: id }, {_id: 0, __v: 0 }).lean()
        .then(vehicle => {
            if (!vehicle) throw Error(`vehicle with id ${id} does not exist`)
            vehicle.id = id 
            return vehicle
        })
}
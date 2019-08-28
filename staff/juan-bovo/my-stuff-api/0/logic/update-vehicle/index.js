const { Vehicle } = require('../../data')

module.exports = function(id, fieldsToUpdate) {

    return Vehicle.findByIdAndUpdate(id, { $set: fieldsToUpdate })
        .then(vehicle => {
             if (!vehicle) throw Error(`vehicle with id ${id} does not exist`)
        })
}
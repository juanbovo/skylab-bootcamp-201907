const { User } = require('../../data')
const { Property } = require('../../data')

module.exports = function(id, fieldsToUpdate) {
    return Property.findByIdAndUpdate(id, { $set: fieldsToUpdate })
        .then(property => {
             if (!property) throw Error(`property with id ${id} does not exist`)
        })
}
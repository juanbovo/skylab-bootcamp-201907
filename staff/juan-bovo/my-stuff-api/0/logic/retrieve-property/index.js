const { Property } = require('../../data')

module.exports = function(id) {
    
    return Property.findOne({ _id: id }, { _id: 0 }).lean()
        .then(property => {
            if (!property) throw Error(`property with id ${id} does not exist.`)
            property.id = id
            return property
        })
}
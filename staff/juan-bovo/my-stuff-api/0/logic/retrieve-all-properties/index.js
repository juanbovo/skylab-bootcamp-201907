const { Property } = require('../../data')

module.exports = function(id) {
    
    validate.string(id, 'user id')

    return Property.find({ owner : id }, { __v: 0 }).lean()
        .then(properties => {
            if (!properties) throw Error(`user with id ${id} does not own any car.`)
            properties.forEach(property => {
                property.id = property._id
                delete property._id
            })
            return property
        })
}
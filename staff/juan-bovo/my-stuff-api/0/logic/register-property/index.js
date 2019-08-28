const { Property } = require('../../data')


module.exports = function(address, m2, year, cadastre, id) {

    return Property.findOne({ cadastre })
        .then(response => {
            if (response) throw new Error('property already exists')
            const property = new Property({ address,m2, year, cadastre })
            property.owners.push(id)
            return property.save()
        })
        .then(response => response._id.toString())
}    

const { User } = require('../../data')
const { Property } = require('../../data')

module.exports = function(id) {

    return Property.deleteOne({ _id: id })
        .then(result => {
            if (!result.deletedCount) throw Error('wrong data provided')
        })
}
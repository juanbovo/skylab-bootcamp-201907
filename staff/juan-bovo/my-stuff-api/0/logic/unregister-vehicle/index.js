const { Vehicle } = require('../../data')

module.exports = function(id){
    return Vehicle.deleteOne({ _id: id })
        .then(response => {
            if (!response.deletedCount) throw Error(`wrong id`)
        })
}
const { User } = require('../../data')
const { Card } = require('../../data')

module.exports = function(uID, number) {

    return User.findOne({ _id : uID }, { _id: 0, __v: 0 })
        .then(user => { 
            
            const { cards } = user
            const index = cards.findIndex(card => card.id === number)
            if (index<0) throw Error(`card not found`)
            cards.splice(index)
            user.save()
              
        })
}
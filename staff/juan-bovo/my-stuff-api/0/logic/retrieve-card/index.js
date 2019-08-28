const { Card } = require('../../data')
const { User } = require('../../data')
const mongoose = require('mongoose')

module.exports = function (id, number) {
    return User.findOne({ _id: id }).lean()
        .then(user => {
            if (!user) throw new Error(`user with id ${id} not found.`)
            if (!user.cards) throw new Error (`User does not have any cards`)
            //console.log(user.cards) //--> [{"_id":"5d653073c787496ae103533d","number":"4444 6666 7777 5555","expiry":"2099-03-31T22:00:00.000Z"}]
            card = user.cards.find(num => num.number == number)
            debugger
            //console.log(card)
            return card
            // .then((card) => {
            //     if (!card) throw new Error(`Card with number ${number} does not exists.`)
            //     //debugger
            //     return card
            // })            
        })
}
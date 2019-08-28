const { Card } = require('../../data')
const { User } = require('../../data')

module.exports = function(id, number, expiry){
    return User.findOne({ _id : id })
    .then(user => {

        const pedo = user.cards.find(card => {
            return card.number == number
        })
        if (pedo) throw new Error(`Card with number ${number} already exists.`)

        const date = convertDate(expiry)

        let cardToAdd = new Card({ number, expiry: date })

        user.cards.push(cardToAdd)
        
        return user.save()
    })
    //.then((response) => { console.log(response) }) // response devuelve el user completo... quizás tenga que poner que devuelve algo para hacer el retrieveCard
    .then(() => { })
}

function convertDate(stringDate) {
    const dateArray = stringDate.split('/')
    const month = Number(dateArray[0])
    const year = Number(`20${dateArray[1]}`)
    return new Date(year, month).toLocaleDateString()
}
const { expect } = require('chai')
const logic = require('..')
const { User } = require('../../data')
const { Card } = require('../../data')
const mongoose = require('mongoose')

describe('logic - retrieve card', () => {
    before(()=> mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))
    let name, surname, email, password, cards, number, expiry, uId, newUser, newCard, card_id
    
    beforeEach(() => {
        return User.deleteMany()
        .then(() =>{
            newUser = new User

            newUser.name = `name-${Math.random()}`
            newUser.surname = `surname-${Math.random()}`
            newUser.email = `email-${Math.random()}@domain.com`
            newUser.password = `password-${Math.random()}`
            newUser.cards = []

            number = '4444 6666 7777 5555'
            expiry = '03/99'

            const date = convertDate(expiry)

            newCard = new Card({number, expiry: date})
            newUser.cards.push(newCard)
            // debugger
            return newUser.save()
                .then(user => uId = user.id)
        })


    })

    it('should retrieve the right card on correct data', () =>
        logic.retrieveCard(uId, number)
            .then(card => {
                expect(card).to.exist
                //expect(card._id).to.equal(card_id) // Esto tal vez haya que convertirlo a string o algo
                expect(card.number).to.equal(number)
                expect(card.expiry).to.exist
            })
    )
    after(() => mongoose.disconnect())
})

function convertDate(stringDate) {
    const dateArray = stringDate.split('/')
    const month = Number(dateArray[0])
    const year = Number(`20${dateArray[1]}`)
    return new Date(year, month).toLocaleDateString()
}
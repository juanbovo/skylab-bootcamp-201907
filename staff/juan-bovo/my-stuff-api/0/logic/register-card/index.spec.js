const { expect } = require('chai')
const logic = require('..')
const { User } = require('../../data')
const { Card } = require('../../data')
const mongoose = require('mongoose')

describe('logic - register credit card', ()=>{
    before(()=> mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, number, expiry

    beforeEach(()=>{
        //User
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        //Credit card to push on user.cards
        number = '2222 3333 4444 5555'
        expiry = '03/99'

        return User.deleteMany() //Shouldn't deleteMany on Cards 'cause there isn't any Cards-db, isn't it?
            .then(() => User.create({ name, surname, email, password }))
            .then(user => {id = user.id})

    })

    it('should register a credit card on correct data', () =>
        logic.registerCard(id, number, expiry)
            .then(() => {
                return User.findById(id)
                .then(user => {
                    expect(user.cards).to.exist
                    expect(user.cards[0].number).to.equal(number)
                    expect(user.cards[0].expiry).to.exist
                })
            })
    )

    after(() => mongoose.disconnect())
})
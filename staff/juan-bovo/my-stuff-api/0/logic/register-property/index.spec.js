const { expect } = require('chai')
const logic = require('../')
const { User } = require('../../data')
const { Property } = require('../../data')
const mongoose = require('mongoose')

describe('logic - register property', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))
    
    let address, m2, year, cadastre, id, propertyId

    beforeEach(() => {

        address = `address-${Math.random()}`
        m2 = Number((Math.random()*500).toFixed())
        year = Number((Math.random()*1000).toFixed())
        cadastre = `cadastre-${Math.random()}`

        return Property.deleteMany()
            .then(() => {
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@email.com`
                password = `123-${Math.random()}`

                return User.create({ name, surname, email, password })
            })
            .then(user => id = user._id.toString())
    })

    it('should succeed on correct data', () =>
        logic.registerProperty(address, m2, year, cadastre, id)
            .then(result => {
                propertyId = result
                expect(propertyId).to.exist
                return Property.findOne({ cadastre })
            })
            .then(property => {
                expect(property).to.exist
                expect(property.id).to.equal(propertyId)
                expect(property.address).to.equal(address)
                expect(property.m2).to.equal(m2)
                expect(property.year).to.equal(year)
                expect(property.cadastre).to.equal(cadastre)
            })
    )

    it('should fail if the property already exists', () =>
       Property.create({ address, m2, year, cadastre })
           .then (() => logic.registerProperty(address, m2, year, cadastre, id)
               .catch( error =>{
                   expect(error).to.exist
                   expect(error.message).to.equal(`property already exists`)
               })
           )
    )

    after(() => mongoose.disconnect())
})
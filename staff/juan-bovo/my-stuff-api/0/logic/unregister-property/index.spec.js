const mongoose = require('mongoose')
const logic = require('../')
const { expect } = require('chai')
const { User } = require('../../data')
const { Property } = require('../../data')

describe('logic - unregister property', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test',  { useNewUrlParser: true }))

    let address, m2, year, cadastre

    beforeEach(() => {

        address = `address-${Math.random()}`
        m2 = Number((Math.random()*1000).toFixed())
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
            .then(() => Property.create({ address, m2, year, cadastre }))

            .then(property => propertyId = property.id)
    })

    it('should succeed on correct data', () =>
        logic.unregisterProperty(propertyId)
            .then(result => {
                expect(result).not.to.exist

                return Property.findById(propertyId)
            })
            .then(property => {
                expect(property).not.to.exist
            })
    )
    after(() => mongoose.disconnect())
})
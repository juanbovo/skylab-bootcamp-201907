const mongoose = require('mongoose')
const logic = require('../')
const { expect } = require('chai')
const { User } = require('../../data')
const { Property } = require('../../data')

describe('logic - retrieve property', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let propertyId, address, m2, year, cadastre

    beforeEach(() => {

        address = `proaddr-${Math.random()}`
        m2 = Number((Math.random()*1000).toFixed())
        year = Number((Math.random()*1000).toFixed())
        cadastre = `cadaddr-${Math.random()}`

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
        logic.retrieveProperty(propertyId)
            .then(property => {
                expect(property).to.exist
                expect(property.id).to.equal(propertyId)
                expect(property.address).to.equal(address)
                expect(property.m2).to.equal(m2)
                expect(property.year).to.equal(year)
                expect(property.cadastre).to.equal(cadastre)
            })
    ) 

    after(() => mongoose.disconnect())
})
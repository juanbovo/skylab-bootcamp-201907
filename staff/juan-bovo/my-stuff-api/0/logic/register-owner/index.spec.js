const mongoose = require('mongoose')
const logic = require('../')
const { expect } = require('chai')
const { User } = require('../../data')
const { Property } = require('../../data')

describe('logic - register owner', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let address, m2, year, cadastre, propertyId, ownerId

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
            .then(user => ownerId = user._id.toString())
            .then(() => Property.create({address, m2, year, cadastre}))
            .then(property => propertyId = property.id)
    })

    it('should succeed on correct data', () =>
        logic.registerPropertyOwner(propertyId, ownerId)
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
           .then (() => logic.registerPropertyOwner(propertyId, ownerId)
               .catch( error =>{
                   expect(error).to.exist
                   expect(error.message).to.equal(`property already exists`)
               })
           )
    )

    after(() => mongoose.disconnect())
})
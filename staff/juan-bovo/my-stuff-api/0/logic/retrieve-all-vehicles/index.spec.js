const { expect } = require('chai')
const logic = require('../')
const { User } = require('../../data')
const { Vehicle} = require('../../data')
const mongoose = require('mongoose')

describe('logic - retrieve all vehicles', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))
    
    let brand, model, year, type, color, electric, plate, id

    beforeEach(() => {
        const typeArray = ['tourism', 'suv', 'van', 'coupe', 'cabrio', 'roadster', 'truck']

        brand = `brand-${Math.random()}`
        model = `model-${Math.random()}`
        year = Number((Math.random()*1000).toFixed())
        type = `${typeArray[Math.floor(Math.random() * typeArray.length)]}`
        color = `color-${Math.random()}`
        electric = Boolean(Math.round(Math.random()))
        plate = `plate-${Math.random()}`

        return Vehicle.deleteMany()
            .then(() => {
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@email.com`
                password = `123-${Math.random()}`

                return User.create({ name, surname, email, password })
            })
            .then(user => id = user._id.toString())
    })

    it('should succeed on retrieving vehicles', () => {
        logic.retrieveAllVehicles(id)
            .then(result => {
                expect(result).to.exist
                return Vehicle.findOne({ plate })
            })
    })
    after(() => mongoose.disconnect())
})
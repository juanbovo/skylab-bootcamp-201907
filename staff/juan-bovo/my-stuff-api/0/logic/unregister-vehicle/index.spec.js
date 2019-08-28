const { expect } = require('chai')
const logic = require('../')
const { User } = require('../../data')
const { Vehicle } = require('../../data')
const mongoose = require('mongoose')

describe('logic - unregister vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let brand, model, year, type, color, electric, plate, id, vehicleId

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
            .then(() => Vehicle.create({brand, model, year, type, color, electric, plate}))
            .then(vehicle => vehicleId = vehicle.id)
        })

        it('should succesfully unregister a vehicle', () =>
        logic.unregisterVehicle(vehicleId)
            .then(result => {
                expect(result).not.to.exist

                return Vehicle.findById(vehicleId)
            })
            .then(vehicle => {
                expect(vehicle).not.to.exist
            }))


    after(() => mongoose.disconnect())
})

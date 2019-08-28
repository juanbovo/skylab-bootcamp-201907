const { expect } = require('chai')
const logic = require('../')
const { Vehicle } = require('../../data')
const { User } = require('../../data')
const mongoose = require('mongoose')

describe('logic - retrieve vehicle', () => {
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

    it('should succesfully retrieve a vehicle', () => {
        logic.retrieveVehicle(vehicleId)
        .then(vehicle => {
            expect(vehicle).to.exist
            expect(vehicle.id).to.equal(vehicleId)
            expect(vehicle.brand).to.equal(brand)
            expect(vehicle.model).to.equal(model)
            expect(vehicle.year).to.equal(year)
            expect(vehicle.type).to.equal(type)
            expect(vehicle.color).to.equal(color)
            expect(vehicle.electric).to.equal(electric)
        })
    })
    after(() => mongoose.disconnect())
})
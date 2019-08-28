const { Router } = require('express')
const bodyParser = require('body-parser')
const tokenMiddleware = require('../helpers/token-middleware')
const registerUser = require('./register-user')
const authenticateUser = require('./authenticate-user')
const retrieveUser = require('./retrieve-user')
const updateUser = require('./update-user')
const unregisterUser = require('./unregister-user')
const registerCard = require('./register-card')
const retrieveCard = require('./retrieve-card')
const unregisterCard = require('./unregister-card')
const registerVehicle = require('./register-vehicle')
const retrieveVehicle = require('./retrieve-vehicle')
const retrieveAllVehicles = require('./retrieve-all-vehicles')
const updateVehicle = require('./update-vehicle')
const unregisterVehicle = require('./unregister-vehicle')

const router = Router()

const jsonBodyParser = bodyParser.json()

//USER
router.post('/users', jsonBodyParser, registerUser)

router.post('/auth', jsonBodyParser, authenticateUser)

router.get('/users/:id', [tokenMiddleware, jsonBodyParser], retrieveUser)

router.patch('/users/:id', [tokenMiddleware, jsonBodyParser], updateUser)

router.delete('/users/:id', [tokenMiddleware, jsonBodyParser], unregisterUser)

//CARDS
router.post('/users/:id/cards', [tokenMiddleware, jsonBodyParser], registerCard)

router.get('/users/:id/cards/:cardId', [tokenMiddleware, jsonBodyParser], retrieveCard)

router.delete ('/users/:id/cards/:cardId', [tokenMiddleware, jsonBodyParser], unregisterCard)

//VEHICLES
router.post('/users/:id/vehicles', [tokenMiddleware, jsonBodyParser], registerVehicle)

router.get('/users/:id/vehicles/:vehicleId', [tokenMiddleware, jsonBodyParser], retrieveVehicle)

router.get('/users/:id/vehicles/', [tokenMiddleware, jsonBodyParser], retrieveAllVehicles)

router.patch ('/users/:id/vehicles/:vehicleId', [tokenMiddleware, jsonBodyParser], updateVehicle)

router.delete ('/users/:id/vehicles/:vehicleId', [tokenMiddleware, jsonBodyParser], unregisterVehicle)


module.exports = router
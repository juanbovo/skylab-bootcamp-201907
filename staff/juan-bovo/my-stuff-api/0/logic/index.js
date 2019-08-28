module.exports = {
    //USERS:
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    updateUser: require('./update-user'),
    unregisterUser: require('./unregister-user'),
     
    //CARDS:
    registerCard: require('./register-card'),
    retrieveCard: require('./retrieve-card'),
    unregisterCard: require('./unregister-card'),

    //VEHICLES:
    registerVehicle: require('./register-vehicle'),
    retrieveVehicle: require('./retrieve-vehicle'),
    retrieveAllVehicles: require('./retrieve-all-vehicles'),
    updateVehicle: require('./update-vehicle'),
    unregisterVehicle: require('./unregister-vehicle'),

    //PROPERTIES:
    registerPropertyOwner : require('./register-owner'),
    registerProperty: require('./register-property'),
    retrieveProperty: require('./retrieve-property'),
    retrieveAllProperties: require('./retrieve-all-properties'),
    unregisterOwner: require('./unregister-owner'),
    updateProperty: require('./update-property'),
    unregisterProperty: require('./unregister-property')
}
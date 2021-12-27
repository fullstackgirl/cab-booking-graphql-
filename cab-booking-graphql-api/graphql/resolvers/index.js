const bookingResolver = require('./booking')
const vehicleResolver = require('./vehicle')

const rootResolver = {
    ...bookingResolver,
    ...vehicleResolver
}

module.exports = rootResolver
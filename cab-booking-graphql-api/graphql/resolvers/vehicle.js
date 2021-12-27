const Vehicle = require('../../models/vehicle.model')

const { vehicleSchema } = require('../../validation/vehicle.schema')

const { vehicleReturnFormatter } = require('../../helper/resolvers.helper')

module.exports = {
    createVehicle: async args => {
        try {
            const vehicle = {
                vehicle: {
                    name: args.vehicleInput.name,
                    capacity: args.vehicleInput.capacity,
                    date_of_manufacture: args.vehicleInput.date_of_manufacture,
                    model: args.vehicleInput.model,
                    vin: args.vehicleInput.vin
                }
            }

            const value = vehicleSchema.validate(vehicle)
            if (value.error)
                return value.error

            const result = await Vehicle.create(vehicle)

            return vehicleReturnFormatter(result)
        } catch (err) {
            return err
        }
    },

    vehicles: async() => {
        try {
            const vehicles = await Vehicle.find()

            return vehicles.map(element => {
                return vehicleReturnFormatter(element)
            })
        } catch (err) {
            return err
        }
    }
}
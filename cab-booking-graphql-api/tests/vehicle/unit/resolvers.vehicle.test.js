const vehicleResolver = require('../../../graphql/resolvers/vehicle')

const Vehicle = require('../../../models/vehicle.model')

const allVeh = require('../mock-data/all-veh.json')

const vehRes = require('../mock-data/veh-res.json')
const createVehArgs = require('../mock-data/create-veh-args.json')
const createVehCusVeh = require('../mock-data/create-veh-cus-veh.json')
const createVehResult = require('../mock-data/create-veh-result.json')
const createVehRes = require('../mock-data/create-veh-res.json')
const createVehInvalVinArgs = require('../mock-data/create-veh-inval-vin-args.json')


Vehicle.find = jest.fn()
Vehicle.create = jest.fn()

describe("vehicleResolver.vehicles", () => {
    it("should have vehicles function", () => {
        expect(typeof vehicleResolver.vehicles).toBe("function");
    })
    it("should call Vehicle.find()", async() => {
        Vehicle.find.mockReturnValue(allVeh)
        await vehicleResolver.vehicles()
        expect(Vehicle.find).toHaveBeenCalledWith()
    })
    it("should return all vehicles", async() => {
        Vehicle.find.mockReturnValue(allVeh)
        expect(await vehicleResolver.vehicles()).toStrictEqual(vehRes)
    })
    it("should handle error", async() => {
        const message = { message: "Some Error" }
        const rejectPromise = Promise.reject(message)
        Vehicle.find.mockReturnValue(rejectPromise)
        expect(await vehicleResolver.vehicles()).toStrictEqual(message)
    })
})

describe("vehicleResolver.createVehicle", () => {
    it("should have createVehicle function", () => {
        expect(typeof vehicleResolver.createVehicle).toBe("function")
    })
    it("should call Vehicle.create", async() => {
        await vehicleResolver.createVehicle(createVehArgs)
        expect(Vehicle.create).toHaveBeenCalledWith(createVehCusVeh)
    })
    it("should validate vin", async() => {
        const message = "\"vehicle.vin\" length must be 17 characters long"
        const res = await vehicleResolver.createVehicle(createVehInvalVinArgs)
        expect(res.details[0].message).toStrictEqual(message)
    })
    it("should return created vehicle", async() => {
        Vehicle.create.mockReturnValue(createVehResult)
        expect(await vehicleResolver.createVehicle(createVehArgs)).toStrictEqual(createVehRes)
    })
    it("should handle error", async() => {
        const message = { message: "Some Error" }
        const rejectPromise = Promise.reject(message)
        Vehicle.create.mockReturnValue(rejectPromise)
        expect(await vehicleResolver.createVehicle(createVehArgs)).toStrictEqual(message)
    })
})
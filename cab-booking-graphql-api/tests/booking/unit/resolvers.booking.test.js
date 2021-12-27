const bookingResolver = require('../../../graphql/resolvers/booking')

const Booking = require('../../../models/booking.model')
const Vehicle = require('../../../models/vehicle.model')

const allBookings = require('../mock-data/all-bookings.json')
const allBookingsRes = require('../mock-data/all-bookings-res.json')
const bookingsByVin = require('../mock-data/bookings-by-vin.json')
const bookingsByVinRes = require('../mock-data/bookings-by-vin-res.json')
const bookingsByDate = require('../mock-data/bookings-by-date.json')
const createBookingArgs = require('../mock-data/create-booking-args.json')
const specificVeh = require('../mock-data/specific-veh.json')
const createdBooking = require('../mock-data/created-booking.json')
const createdBookingRes = require('../mock-data/created-booking-res.json')

Booking.find = jest.fn()
Vehicle.find = jest.fn()
Booking.create = jest.fn()

describe("bookingResolver.createBooking", () => {

    beforeEach(() => {
        jest.useFakeTimers('modern')
        jest.setSystemTime(new Date(2021, 10, 25, 10, 0, 0, 0))
    })

    it("should have createBooking function", () => {
        expect(typeof bookingResolver.createBooking).toBe("function")
    })
    it("should call Vehicle.find", async() => {
        const args = createBookingArgs
        await bookingResolver.createBooking(args)
        expect(Vehicle.find).toHaveBeenCalledWith({ "vehicle.vin": args.bookingInput.vin })
    })
    it("should return created booking", async() => {
        const args = createBookingArgs
        Vehicle.find.mockReturnValue(specificVeh)
        Booking.create.mockReturnValue(createdBooking)
        expect(await bookingResolver.createBooking(args)).toStrictEqual(createdBookingRes)
    })
    it("should handle error", async() => {
        const args = createBookingArgs
        const message = { message: "Some Error" }
        const rejectPromise = Promise.reject(message)
        Vehicle.find.mockReturnValue(rejectPromise)
        expect(await bookingResolver.createBooking(args)).toStrictEqual(message)
    })

    afterAll(() => {
        jest.useRealTimers()
    })

})

describe("bookingResolver.bookings", () => {
    it("should have bookings function", () => {
        expect(typeof bookingResolver.bookings).toBe("function")
    })
    it("should call Booking.find()", async() => {
        await bookingResolver.bookings()
        expect(Booking.find).toHaveBeenCalledWith()
    })
    it("should return all bookings", async() => {
        Booking.find.mockReturnValue(allBookings)
        expect(await bookingResolver.bookings()).toStrictEqual(allBookingsRes)
    })
    it("should handle error", async() => {
        const message = { message: "Some Error" }
        const rejectPromise = Promise.reject(message)
        Booking.find.mockReturnValue(rejectPromise)
        expect(await bookingResolver.bookings()).toStrictEqual(message)
    })
})

describe("bookingResolver.bookingsByVin", () => {
    it("should have bookingsByVin function", () => {
        expect(typeof bookingResolver.bookingsByVin).toBe("function")
    })
    it("should call Booking.find()", async() => {
        const args = { vin: "12345678901234564" }
        await bookingResolver.bookingsByVin(args)
        expect(Booking.find).toHaveBeenCalledWith({ "vehicle.vin": args.vin })
    })
    it("should return all bookings", async() => {
        const args = { vin: "12345678901234564" }
        Booking.find.mockReturnValue(bookingsByVin)
        expect(await bookingResolver.bookingsByVin(args)).toStrictEqual(bookingsByVinRes)
    })
    it("should handle error", async() => {
        const args = { vin: "12345678901234564" }
        const message = { message: "Some Error" }
        const rejectPromise = Promise.reject(message)
        Booking.find.mockReturnValue(rejectPromise)
        expect(await bookingResolver.bookingsByVin(args)).toStrictEqual(message)
    })
})

describe("bookingResolver.bookingsByDate", () => {
    it("should have bookingsByDate function", () => {
        expect(typeof bookingResolver.bookingsByDate).toBe("function")
    })
    it("should call Booking.find()", async() => {
        const args = { date: "2021-12-13" }
        await bookingResolver.bookingsByDate(args)
        expect(Booking.find).toHaveBeenCalledWith()
    })
    it("should return all bookings", async() => {
        const args = { date: "2021-12-10" }
        Booking.find.mockReturnValue(allBookings)
        expect(await bookingResolver.bookingsByDate(args)).toStrictEqual(bookingsByDate)
    })
    it("should handle error", async() => {
        const args = { date: "2021-12-10" }
        const message = { message: "Some Error" }
        const rejectPromise = Promise.reject(message)
        Booking.find.mockReturnValue(rejectPromise)
        expect(await bookingResolver.bookingsByDate(args)).toStrictEqual(message)
    })
})
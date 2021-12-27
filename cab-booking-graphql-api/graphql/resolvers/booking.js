const constants = require('../../constants/cab-booking')

const Vehicle = require('../../models/vehicle.model')
const Booking = require('../../models/booking.model')

const { bookingReturnFormatter, bookingUpdate } = require('../../helper/resolvers.helper')

module.exports = {
    createBooking: async args => {
        try {
            let vehicle = await Vehicle.find({ "vehicle.vin": args.bookingInput.vin })

            const todayDate = new Date()

            const booking = {
                customer: {
                    name: args.bookingInput.customer.name,
                    email: args.bookingInput.customer.email,
                    phone_number: args.bookingInput.customer.phone_number,
                    cus_capacity: args.bookingInput.customer.cus_capacity
                },
                vehicle: {
                    _id: vehicle[0]._id,
                    name: vehicle[0].vehicle.name,
                    capacity: vehicle[0].vehicle.capacity,
                    date_of_manufacture: vehicle[0].vehicle.date_of_manufacture,
                    model: vehicle[0].vehicle.model,
                    vin: vehicle[0].vehicle.vin
                },
                booking_date: todayDate
            }

            if (todayDate.getHours() < constants.OPENING_HOUR || todayDate.getHours() > constants.CLOSING_HOUR) {
                return Error("Booking is only open from 9 AM to 5 PM")
            } else if (booking.customer.cus_capacity > vehicle[0].vehicle.capacity) {
                return Error("Booking capacity is " + vehicle[0].vehicle.capacity)
            } else {
                const bookingRes = await Booking.create(booking);
                return bookingReturnFormatter(bookingRes)
            }
        } catch (err) {
            return err
        }
    },

    bookings: async() => {
        try {
            const bookings = await Booking.find()
            const updatedBooking = await bookingUpdate(bookings)
            return updatedBooking.map(element => {
                return bookingReturnFormatter(element)
            })
        } catch (err) {
            return err
        }
    },

    bookingsByVin: async({ vin }) => {
        try {
            const bookings = await Booking.find({ "vehicle.vin": vin });
            const updatedBooking = await bookingUpdate(bookings)
            return updatedBooking.map(element => {
                return bookingReturnFormatter(element)
            })
        } catch (err) {
            return err
        }
    },

    bookingsByDate: async({ date }) => {
        try {
            const bookings = await Booking.find()
            const updatedBooking = await bookingUpdate(bookings)

            const bookingByDate = []
            updatedBooking.map((item) => {
                const booking_date = new Date(item.booking_date)
                if ((date.substring(0, 4) == booking_date.getFullYear()) &&
                    (date.substring(5, 7) == (booking_date.getMonth() + 1)) &&
                    (date.substring(8, 10) == booking_date.getDate())) {
                    bookingByDate.push(item)
                }
            });

            return bookingByDate.map(element => {
                return bookingReturnFormatter(element)
            })
        } catch (err) {
            return err
        }
    }
}
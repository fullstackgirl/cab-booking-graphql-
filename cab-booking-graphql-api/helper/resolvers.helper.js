const constants = require('../constants/cab-booking')
const Booking = require('../models/booking.model')

module.exports = {
    bookingUpdate: async(booking) => {
        const updatedBooking = [];
        booking.map((item) => {
            const currentDate = new Date()
            const booking_date = new Date(item.booking_date)
            const timeDifference = Math.abs(booking_date.getTime() - currentDate.getTime())
            if (timeDifference > constants.BOOKING_VALIDITY) {
                item.is_active = false
                    // item.save()
            }
            updatedBooking.push(item);
        });
        return updatedBooking
    },

    vehicleReturnFormatter: (vehicle) => {
        return {
            ...vehicle._doc,
            _id: vehicle._id,
            name: vehicle.vehicle.name,
            capacity: vehicle.vehicle.capacity,
            date_of_manufacture: new Date(vehicle.vehicle.date_of_manufacture).toISOString(),
            model: vehicle.vehicle.model,
            vin: vehicle.vehicle.vin
        }
    },

    bookingReturnFormatter: (booking) => {
        return {
            ...booking._doc,
            _id: booking._id,
            customer: {
                name: booking.customer.name,
                email: booking.customer.email,
                phone_number: booking.customer.phone_number,
                cus_capacity: booking.customer.cus_capacity
            },
            vehicle: {
                _id: booking.vehicle._id,
                name: booking.vehicle.name,
                capacity: booking.vehicle.capacity,
                date_of_manufacture: new Date(booking.vehicle.date_of_manufacture).toISOString(),
                model: booking.vehicle.model,
                vin: booking.vehicle.vin
            },
            booking_date: new Date(booking.booking_date).toISOString(),
            is_active: booking.is_active
        }
    }
}
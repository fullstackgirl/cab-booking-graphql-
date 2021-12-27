const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Vehicle {
    _id: ID!
    name: String!
    capacity: Int!
    date_of_manufacture: String!
    model: String!
    vin: String!
}

input VehicleInput {
    name: String!
    capacity: Int!
    date_of_manufacture: String!
    model: String!
    vin: String!
}

type Booking {
    _id: ID!
    customer: Customer!
    vehicle: Vehicle!
    booking_date: String
    is_active: Boolean
}

input BookingInput {
    customer: CustomerInput!
    vin: String!
}

type Customer {
    name: String!
    email: String!
    phone_number: Int!
    cus_capacity: Int!
}

input CustomerInput {
    name: String!
    email: String!
    phone_number: Int!
    cus_capacity: Int!
}

type RootQuery {
    vehicles: [Vehicle!]!
    bookings: [Booking!]!
    bookingsByVin(vin: String!): [Booking!]!
    bookingsByDate(date: String!): [Booking!]!
}

type RootMutation {
    createVehicle(vehicleInput: VehicleInput!): Vehicle!
    createBooking(bookingInput: BookingInput): Booking
}

schema {
    query: RootQuery
    mutation: RootMutation
}

`)
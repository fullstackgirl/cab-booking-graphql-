module.exports = {
    PORT: 8005,
    DATABASE_URL: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cab-booking-cluster.8mofo.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    OPENING_HOUR: 9,
    CLOSING_HOUR: 17,
    BOOKING_VALIDITY: 7200000
}
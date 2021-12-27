const express = require('express')
const constants = require('./constants/cab-booking')
const db = require('./db-config')

const { graphqlHTTP } = require('express-graphql')
const graphqlSchema = require('./graphql/schema/index')
const graphqlResolvers = require('./graphql/resolvers/index')

const app = express()
app.use(express.json())

app.use('/graphql',
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolvers,
        graphiql: true
    })
)

app.listen(constants.PORT, () => {
    console.log(`Server Started on ${constants.PORT}`)
})
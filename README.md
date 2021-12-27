# Cab-Booking

It is a GraphQL API in node.js which consist of creation of booking and getting booking.  

## Technology Used  

* Node.JS
* MongoDB Atlas & Mongoose
* Express.JS
* GraphQL
* GraphiQL
* Imp Dependency used-
  * express-grapqh
  * joi
  * jest

## Directory Info

* **postman-collection:** collection of all endpoints
* **mongodb-atlas-config:** content steps to configure database
* **cab-booking-graphql-api:** project

## Prerequisite

1. Install Node.JS
2. For configuring MongoDB Atlas refer- **mongodb-atlas-config**
3. Changes required to run the application.
   1. In **/nodemon.json**-
      1. MONGO_USER
      2. MONGO_PASSWORD
      3. MONGO_DB_NAME
   2. In **/constants/cab-booking.js**-
      1. DATABASE_URL
4. For Getting suggestion while using postman make sure that you have added graphql schema in api of postman. Follow these steps-
   1. Go to "APIs".
   2. Create new API-
      1. Name it.
      2. Give Version.
      3. Choose schema type "GraphQL" and Schema format "GraphQL SDL".
   3. Go to Definition
   4. Paste the schema from the schema available in ` cab-booking-graphql-api/graphql/schema/index.js ` and Save it.

## Cab-Booking-Graphql-API

This is a cab booking graphql API which consist of-  

### Endpoints

* Creation of vehicle
* Getting all vehicle
* Creation of Booking
* Getting all Booking
* Getting booking by VID
* Getting booking by Date

### Commands to be used

* install all the packages first using- ` npm i `
* starting application- ` npm start `
* running test cases- ` npm test `
* running test cases with code coverage- ` npm test -- --coverage `

### Note  

* All the Endpoints and there examples are available in postman collection.  

* I will suggest to use GraphiQL instead on postman because it will provide complete suggestion as well as documentation of the schema available in the api.  

* Url for GraphiQL tool- <http://localhost:8005/graphql>

### Flow of the application

Using the example for creating a vehicle.  

If we hit this <http://localhost:8005/graphql> (Post).  

With the query-

```text

mutation{
  createVehicle( vehicleInput:{
    name: "Maruti",
    capacity: 4,
    date_of_manufacture: "2015-08-22T00:00:00.000Z",
    model: "Suzuki",
    vin: "12345678901234561"
  })
  {
    _id
    name
    capacity
    date_of_manufacture
    model
    vin
  }
}

```

Then,  
Firstly, It is going to check whether there is **"createVehicle"** defined in the schema or not i.e.,  

1. The application will go to **app.js**
2. Then it will go to **/graphql/schema/index.js** and will go through these sequential-
   1. Schema
   2. Mutation
   3. RootMutation
   4. createVehicle
3. If it is there, it will work fine otherwise will through some error.
4. Similarly, It is going to check each and every fields, Input, type in the request.

Now, If **"createVehicle"** in there in the schema.  
Then,  

In will go to **graphql/resolvers/index.js** and will find **createVehicle** resolver and will return this-  

```text
{
    "data": {
        "createVehicle": {
            "_id": "61c33629a080972d372a5908",
            "name": "Maruti",
            "capacity": 4,
            "date_of_manufacture": "2015-08-22T00:00:00.000Z",
            "model": "Suzuki",
            "vin": "12345678901234561"
        }
    }
}
```

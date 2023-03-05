# hotelBuilderApi
This is a simple RESTful API for managing hotel rooms, creating users (guests and admins) and roomtypes. A user must be signed in either as an admin or as a guest to carry out the basic CRUD operations.

# Functionalities
An admin can:
• Create a room and roomtype.
• Update a room, user and roomtype.
• Delete a room, user and roomtype.
• Get a room(s), user(s) and roomtype(s)
• Create an account and sign in to view content.
• View rooms and roomtypes.
• Get rooms and roomtypes.
• Get rooms by filtering their codename, roomtype and prices.

A guest can:
• Create an account and sign in to view content.
• View rooms and roomtypes.
• Get rooms and roomtypes.
• Get rooms by filtering their codename, roomtype and prices.
• Edit their profile using their id.
• Delete their profile using their ID.

# Development Dependencies
• Nodejs
• Expressjs
• Mongoose
• Bcrypt
• Jsonwebtoken
• Joi
• Cookie Parser

# How to Install And Run Code
• Download the zip or clone repository and open terminal.
• Use `npm install` to install all dependencies.
• Download `Postman` or `Thunder Client` to simulate running the code as a user on the client side.
• Check the contents of the `.env.example` to set up your `.env` file
• Connect your MongoDb Atlas database with the url.
• Use `npm run build` to build 
• Use `npm start` to run the program.

# Sample Requests And Responses

## Creating a new roomtype:
• endpoint: `localhost:3000/api/v1/roomtypes/create`
• method: `POST`

### sample request:
```
{
    "name": "deluxe",
    "description": "there's no better place to be"
}
```

### sample response:
```
{
    success: true,
    message: 'Roomtype created successfully!',
    data: {
    "name": "deluxe",
    "description": "there's no better place to be"
    "_id": "63e730b65b1b9246ae78b330",
    "createdAt": "2023-02-25T06:07:50.995Z",
    "updatedAt": "2023-02-27T06:07:50.995Z"
    }
}
```

## Updating a roomtype:
• endpoint: `localhost:3000/api/v1/roomtypes/deluxe`
• method: `PATCH`

### sample request:
```
{
    "name": "classic",
    "description": "where class is our watchword"
}
```

### sample response:
```
{
    success: true,
    message: 'Roomtype updated successfully!',
    data: {
    "name": "classic",
    "description": "where class is our watchword"
    "_id": "63e730b65b1b9246ae78b330",
    "createdAt": "2023-02-25T06:07:50.995Z",
    "updatedAt": "2023-02-27T06:07:50.995Z"
    }
}
```

## Deleting a roomtype:
• endpoint: `localhost:3000/api/v1/roomtypes/classic`
• method: `DELETE`

### sample response:
```
{
    success: true,
    message: 'Roomtype deleted successfully!',
    data: {
    "name": "classic",
    "description": "where class is our watchword"
    "_id": "63e730b65b1b9246ae78b330",
    "createdAt": "2023-02-25T06:07:50.995Z",
    "updatedAt": "2023-02-27T06:07:50.995Z"
    "__v": 0
    }
}
```

## Creating a new room:
• endpoint: `localhost:3000/api/v1/rooms/create`
• method: `POST`

### sample request:
```
{
    "codename": "R-007",
    "price": 25000,
    "roomtype": "classic"
}
```

### sample response:
```
{
    success: true,
    message: 'Room created successfully!',
    data: {
    "codename": "R-007",
    "price": 25000,
    "roomtype": {
        "name": "classic",
        "description": "where class is our watchword"
        "_id": "63e730b65b1b9246ae78b330",
        "createdAt": "2023-02-25T06:07:50.995Z",
        "updatedAt": "2023-02-27T06:07:50.995Z",
        "__v": 0
    },
    "_id": "63e730b65b1b9246ae78b330",
    "createdAt": "2023-02-25T06:07:50.995Z",
    "updatedAt": "2023-02-27T06:07:50.995Z",
    "__v": 0
    }
}
```

## Updating a room:
• endpoint: `localhost:3000/api/v1/rooms/r-007`
• method: `PATCH`

### sample request:
```
{
    "codename": "R-009",
    "price": 20000,
    "roomtype": "classic"
}
```

### sample response:
```
{
    success: true,
    message: 'Room updated successfully!',
    data: {
    "codename": "R-009",
    "price": 20000,
    "roomtype": {
        "name": "classic",
        "description": "where class is our watchword"
        "_id": "63e730b65b1b9246ae78b330",
        "createdAt": "2023-02-25T06:07:50.995Z",
        "updatedAt": "2023-02-27T06:07:50.995Z",
        "__v": 0
    },
    "_id": "63e730b65b1b9246ae78b330",
    "createdAt": "2023-02-25T06:07:50.995Z",
    "updatedAt": "2023-02-27T06:07:50.995Z"
    }
}
```

## Deleting a room:
• endpoint: `localhost:3000/api/v1/rooms/r-009`
• method: `DELETE`

### sample response:
```
{
    success: true,
    message: 'Room deleted successfully!',
    data: {
    "codename": "R-009",
    "price": 20000,
    "roomtype": {
        "name": "classic",
        "description": "where class is our watchword"
        "_id": "63e730b65b1b9246ae78b330",
        "createdAt": "2023-02-25T06:07:50.995Z",
        "updatedAt": "2023-02-27T06:07:50.995Z",
        "__v": 0
    },
    "_id": "63e730b65b1b9246ae78b330",
    "createdAt": "2023-02-25T06:07:50.995Z",
    "updatedAt": "2023-02-27T06:07:50.995Z"
    }
}
```

## Getting a room with its id
• endpoint: `localhost:3000/api/v1/rooms/63e730b65b1b9246ae78b330`
• method: `GET`

### sample response:
```
{
    success: true,
    message: 'Room fetched successfully!!',
    data: {
    "codename": "R-009",
    "price": 20000,
    "roomtype": {
        "name": "classic",
        "description": "where class is our watchword"
        "_id": "63e730b65b1b9246ae78b330",
        "createdAt": "2023-02-25T06:07:50.995Z",
        "updatedAt": "2023-02-27T06:07:50.995Z",
        "__v": 0
    },
    "_id": "63e730b65b1b9246ae78b330",
    "createdAt": "2023-02-25T06:07:50.995Z",
    "updatedAt": "2023-02-27T06:07:50.995Z"
    }
}
```

## Searching for a room with some criteria
• endpoint: `localhost:3000/api/v1/rooms?search=r-007&roomType=classic`
• method: `GET`

### sample response:
```
{
    success: true,
    message: 'Room fetched successfully!!',
    data: {
    "codename": "R-009",
    "price": 20000,
    "roomtype": {
        "name": "classic",
        "description": "where class is our watchword"
        "_id": "63e730b65b1b9246ae78b330",
        "createdAt": "2023-02-25T06:07:50.995Z",
        "updatedAt": "2023-02-27T06:07:50.995Z",
        "__v": 0
    },
    "_id": "63e730b65b1b9246ae78b330",
    "createdAt": "2023-02-25T06:07:50.995Z",
    "updatedAt": "2023-02-27T06:07:50.995Z"
    }
}
```

## Signing up
• endpoint: `localhost:3000/api/v1/signup`
• method: `POST`

### sample request:
```
{
    "fullname": "somtochukwu onyeka uzuakpunwa",
    "username": "somtuzy",
    "email": "somtuzy@gmail.com",
    "password": "1234567890",
    "role": "admin",
    "age": 20
}
```

### sample response:
```
{
    "userToken": "abshdjneejjwhhyhOIUOUGGUKNJJJJHHGGFYUJKbgsghhgsghhcfgfhsfscffXSASDDFDFDFC",

    {
    "fullname": "somtochukwu onyeka uzuakpunwa",
    "username": "somtuzy",
    "email": "somtuzy@gmail.com",
    "password": "1234567890",
    "role": "admin",
    "age": 20,
    "_id": "62e756b57v1h896ge68d559",
    "createdAt": "2023-02-25T06:07:50.995Z",
    "updatedAt": "2023-02-27T06:07:50.995Z"
    }
}
```


## Logging in
• endpoint: `localhost:3000/api/v1/login`
• method: `POST`

### sample request:
```
{
    "username": "somtuzy",
    "email": "somtuzy@gmail.com",
    "password": "1234567890"
}
```

## Getting a roomtype by its name:
• endpoint: `localhost:3000/api/v1/roomtypes/classic`
• method: `GET`

### sample response:
```
{
    success: true,
    message: 'Room updated successfully!',
    data: {
    "codename": "R-009",
    "price": 20000,
    "roomtype": {
        "name": "classic",
        "description": "where class is our watchword"
        "_id": "63e730b65b1b9246ae78b330",
        "createdAt": "2023-02-25T06:07:50.995Z",
        "updatedAt": "2023-02-27T06:07:50.995Z",
        "__v": 0
    },
    "_id": "63e730b65b1b9246ae78b330",
    "createdAt": "2023-02-25T06:07:50.995Z",
    "updatedAt": "2023-02-27T06:07:50.995Z"
    }
}
```

## Getting a user by their id:
• endpoint: `localhost:3000/api/v1/users/62e756b57v1h896ge68d559`
• method: `GET`

### sample response:
```
{
    "fullname": "somtochukwu onyeka uzuakpunwa",
    "username": "somtuzy",
    "email": "somtuzy@gmail.com",
    "password": "1234567890",
    "role": "admin",
    "age": 20,
    "_id": "62e756b57v1h896ge68d559",
    "createdAt": "2023-02-25T06:07:50.995Z",
    "updatedAt": "2023-02-27T06:07:50.995Z"
}

```

## Editing a user by their id:
• endpoint: `localhost:3000/api/v1/users/62e756b57v1h896ge68d559`
• method: `PATCH`

### sample request:
```
{
    "fullname": "somtochukwu uzuakpunwa",
    "username": "somtuzay",
    "email": "somtuzay@gmail.com",
    "password": "1234567890",
    "role": "admin",
    "age": 21
}
```

### sample response:
```
{
    "message" "user updated successfully",
    data: {
        "fullname": "somtochukwu uzuakpunwa",
        "username": "somtuzay",
        "email": "somtuzay@gmail.com",
        "password": "1234567890",
        "role": "admin",
        "age": 21,
        "_id": "62e756b57v1h896ge68d559",
        "createdAt": "2023-02-25T06:07:50.995Z",
        "updatedAt": "2023-02-27T06:07:50.995Z"
    }
}
```

## Deleting a user by their id: 
• endpoint: `localhost:3000/api/v1/users/62e756b57v1h896ge68d559`
• method: `DELETE`

### sample response:
```
{
    "message" "user deleted successfully",
    data: {
        "fullname": "somtochukwu uzuakpunwa",
        "username": "somtuzay",
        "email": "somtuzay@gmail.com",
        "password": "1234567890",
        "role": "admin",
        "age": 21,
        "_id": "62e756b57v1h896ge68d559",
        "createdAt": "2023-02-25T06:07:50.995Z",
        "updatedAt": "2023-02-27T06:07:50.995Z"
    }
}
```
NB: Some end points haven't been fully implemented in the best operational way but feel free to test them out.

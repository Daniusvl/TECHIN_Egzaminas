# Start up

## Project uses mongodb so the database needs to be created in there

# Server Configuration ->

## Installing dependencies
cd server -> npm i

## .env file:

```
PORT=1234

DB_CONNECTION_STRING="Your_connection_string"

JWT_ACCESS_TOKEN="Your_Secret"
```

# Client Configuration -> 

## Installing dependencies
cd client -> npm i

## .env file:

```
REACT_APP_SERVER_URL="http://localhost:1234/"
```
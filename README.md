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

### user registration

frontend has fully working /login and /register routes
opon registration it will create user with USER role. To make user an ADMIN, it needs to be set manually in the db.
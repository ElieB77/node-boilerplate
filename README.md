<div align="center">
  
![sloth](https://github.com/ElieB77/node-boilerplate/assets/69645252/1831f9ac-30b6-4f9a-bed1-21598ac8a2a1)

  
  # Node/Express Boilerplate
A simple and easy to use Node/Express starter with basic setup for authentication, routing, middleware, logging and testing.
</div>

## Features

### Implemented Features

✅ Authentication
  - Basic authentication using JWT and Bcrypt

✅ Routing
  - Set up for authentication routes and CRUD operations

✅ Middleware
  - Authorization middleware
  - Global error handling middleware

✅ Database 
  - MongoDB integration using Prisma ORM

✅ Logging 
  - Logging with Winston library

✅ Error Handling 
  - Custom error handling middleware

✅ Security 
  - CORS and Helmet for security headers

✅ Validation 
  - Data validation using express-validator

### Planned Features

• Testing <br>
• Docker <br>
• CI/CD <br>
• OAuth 2.0 <br>
• File system 

## Getting Started

Clone the repository:
```
git clone https://github.com/ElieB77/node-boilerplate.git
```

Install dependencies:
```
npm install
```

Create a '.env' file in the root directory with the following:
```
PORT=3000
DATABASE_URI=mongodb+srv://<YOUR_NAME>:<YOUR_PASSWORD>@cluster0.vvptu.mongodb.net/<YOUR_DB_NAME>
JWT_SECRET=myjwtsecret
LOG_LEVEL=debug
BASE_URL=http://localhost
```

Check if the app is healthy by sending a GET request to the '/health' endpoint:
```
http://localhost:3000/health
```

## Contributing
Contributions are more than welcome!


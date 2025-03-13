# User Management API

## Overview
This is a simple **User Management API** built using **Node.js** and **Express.js**. It allows users to fetch, add, and search for user data stored in a JSON file. The API also includes sorting, random user retrieval, and user count functionalities.

## Features
- **Get all users**: Fetch all users from the database.
- **Get a user by ID**: Retrieve details of a specific user by ID.
- **Search users by name**: Find users whose first name matches a query.
- **Sort users alphabetically**: Get users sorted by first name.
- **Get a random user**: Fetch a randomly selected user.
- **Get total user count**: Get the total number of users.
- **Add a new user**: Add a new user to the database.
- **Logging system**: Keeps track of API requests in `log.txt`.

## Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/user-management-api.git
   cd user-management-api
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Start the server**
   ```sh
   node index.js
   ```

4. **Server runs on** `http://localhost:8000`

## API Endpoints

### Get all users
- **Endpoint:** `GET /api/users`
- **Response:** Returns a list of all users.

### Get a user by ID
- **Endpoint:** `GET /api/users/:id`
- **Response:** Returns user details for the given ID.

### Search users by first name
- **Endpoint:** `GET /api/users/search?name=John`
- **Response:** Returns users whose first name contains "John".

### Sort users alphabetically
- **Endpoint:** `GET /api/users/sort`
- **Response:** Returns users sorted by first name.

### Get a random user
- **Endpoint:** `GET /api/users/random`
- **Response:** Returns a randomly selected user.

### Get total user count
- **Endpoint:** `GET /api/users/count`
- **Response:** Returns the total number of users.

### Add a new user
- **Endpoint:** `POST /api/users`
- **Body Parameters:** `{ "first_name": "John", "last_name": "Doe" }`
- **Response:** Adds a new user and returns their details.

## Logging
- Every API request is logged in `log.txt` with timestamp, method, and route.

## Technologies Used
- **Node.js**
- **Express.js**
- **JSON (Mock Database)**
- **File System (fs) for Logging**

## Future Improvements
- Add **PUT** and **DELETE** methods for updating and removing users.
- Implement a real database like **MongoDB** or **PostgreSQL**.
- Add authentication with **JWT**.

## License
This project is open-source and available under the MIT License.

---


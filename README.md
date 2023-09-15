# Storefront Backend

# Pre-requisites

- Install [Node.js](https://nodejs.org/en/)

# Getting started

- Clone the repository

```
git clone  https://github.com/nhutdang198/image-processing-api.git
```

- Install dependencies

```
cd storefront-backend
npm install
```

- .env file

```
create .env
```

- Migrate database

```
npm run migrate:up
```

- Start application

```
npm run start
```

- Testing

```
npm run test
```

- API endpoints

```
Endpoint: GET /products
Description: Retrieve a list of all products available in the store.
Authentication: Token required

Endpoint: GET /products/:productId
Description: Retrieve details of a specific product by its ID.
Authentication: Token required

Endpoint: POST /products
Description: Create a new product. Requires admin privileges.
Authentication: Token required

Endpoint: PUT /products/:productId
Description: Update the details of a specific product by its ID.
Authentication: Token required

Endpoint: DELETE /products/:productId
Description: Delete a product by its ID. Requires admin privileges.
Authentication: Token required

Endpoint: GET /products/category/:categoryName
Description: Retrieve products by a specific category.
Authentication: Token required

Endpoint: POST /users
Description: Register a new user.
Authentication: Token required

Endpoint: POST /users/login
Description: Authenticate and log in a user, returning a JWT token.
Authentication: Token required

Endpoint: GET /users
Description: Retrieve a list of all users. Requires admin privileges.
Authentication: Token required

Endpoint: GET /users/:userId
Description: Retrieve user details by ID. Requires admin privileges.
Authentication: Token required

Endpoint: POST /orders
Description: Create a new order.
Authentication: Token required

Endpoint: GET /orders
Description: Retrieve a list of all orders. Requires admin privileges.
Authentication: Token required

Endpoint: GET /orders/:orderId
Description: Retrieve order details by ID. Requires admin privileges.
Authentication: Token required

Endpoint: PUT /orders/:orderId
Description: Update the status of an order by its ID. Requires admin privileges.
Authentication: Token required

Endpoint: DELETE /orders/:orderId
Description: Delete an order by its ID. Requires admin privileges.
Authentication: Token required

Endpoint: GET /users/:userId/current-order
Description: Retrieve the current active order for a user.
Authentication: Token required

Endpoint: GET /users/:userId/completed-orders
Description: Retrieve completed orders for a user.
Authentication: Token required
```

- NPM script

| Npm Script     | Description                                                                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `migrate:up`   | Runs the database migrations to apply pending changes. This command is used to update the database schema.                                             |
|  |
| `migrate:down` | Rolls back the last database migration. Use this command to revert changes made during the last migration.                                             |
|  |
| `start`        | Builds the TypeScript source code and starts the server. This command compiles your code and runs the server in production mode.                       |
|  |
| `test`         | Builds the TypeScript source code and runs Jasmine tests. This command is used to execute unit tests and ensure the correctness of your API endpoints. |

Make sure to configure your environment variables and database connection details in a `.env` file before running these scripts. Additionally, ensure that your PostgreSQL database is set up and accessible.
|

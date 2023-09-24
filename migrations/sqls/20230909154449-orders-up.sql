-- Create the orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  quantity INT NOT NULL,
  status VARCHAR(255) NOT NULL
);

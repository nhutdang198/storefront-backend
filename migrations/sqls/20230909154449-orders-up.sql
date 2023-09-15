-- Create the orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  product_ids INT[] NOT NULL,
  quantities INT[] NOT NULL,
  user_id INT NOT NULL,
  status VARCHAR(255) NOT NULL
);

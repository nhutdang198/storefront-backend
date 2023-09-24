CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  product_id INT REFERENCES products(id),
  user_id INT REFERENCES users(id)
);

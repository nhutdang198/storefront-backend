-- Up Migration SQL

-- Add a foreign key column to the 'orders' table that references the 'products' table.
-- This establishes a one-to-many relationship between orders and products.
ALTER TABLE orders
ADD COLUMN product_id INT,  -- Assuming 'product_id' is the name of the foreign key column
ADD CONSTRAINT fk_order_product
  FOREIGN KEY (product_id)
  REFERENCES products (id);

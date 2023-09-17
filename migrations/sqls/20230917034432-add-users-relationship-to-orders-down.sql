-- Down Migration SQL

-- Remove the foreign key constraint from the 'orders' table.
ALTER TABLE orders
DROP CONSTRAINT IF EXISTS fk_order_product;

-- Remove the 'product_id' column from the 'orders' table.
ALTER TABLE orders
DROP COLUMN IF EXISTS product_id;

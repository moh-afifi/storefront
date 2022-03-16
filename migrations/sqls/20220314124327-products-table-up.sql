CREATE TABLE products(
    id SERIAL PRIMARY  KEY,
    product_name VARCHAR(150),
    category VARCHAR(150),
    price DOUBLE PRECISION

);
 GRANT ALL PRIVILEGES ON TABLE products TO store_user;
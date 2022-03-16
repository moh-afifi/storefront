CREATE TABLE users(
    id SERIAL PRIMARY  KEY,
    user_name VARCHAR(150),
    first_name VARCHAR(150),
    last_name VARCHAR(150),
    password VARCHAR(150)
);

 GRANT ALL PRIVILEGES ON TABLE users TO store_user;

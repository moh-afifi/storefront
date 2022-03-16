CREATE TABLE users(
    id SERIAL PRIMARY  KEY,
    user_name VARCHAR(150),
    first_name VARCHAR(150),
    last_name VARCHAR(150),
    password VARCHAR(150)
);

 GRANT ALL PRIVILEGES ON TABLE users TO store_user;

 INSERT INTO users (user_name, password,first_name,last_name) VALUES('user1', '123456' ,'test', 'user') RETURNING * ;

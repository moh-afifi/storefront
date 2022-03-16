CREATE TABLE orders(
    id SERIAL PRIMARY  KEY,
    order_status VARCHAR(150),
    user_id integer REFERENCES users(id)
);


 GRANT ALL PRIVILEGES ON TABLE orders TO store_user;

  INSERT INTO orders (order_status , user_id) VALUES('open', '1') RETURNING * ;

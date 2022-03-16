CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id integer REFERENCES orders(id),
    product_id integer REFERENCES products(id)
);

GRANT ALL PRIVILEGES ON TABLE order_products TO store_user;

INSERT INTO order_products (quantity, order_id, product_id) VALUES('10', '1', '1') RETURNING *;
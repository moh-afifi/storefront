Drop TABLE order_products;
REVOKE ALL ON TABLE order_products  IN SCHEMA public FROM store_user;
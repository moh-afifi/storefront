DROP TABLE orders;
REVOKE ALL ON TABLE orders  IN SCHEMA public FROM store_user;
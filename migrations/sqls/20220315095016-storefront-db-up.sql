-- CREATE DATABASE storefront_db;
-- CREATE DATABASE storefront_db_test;

-- CREATE USER store_user WITH PASSWORD '123456';
-- CREATE USER store_user_test WITH PASSWORD '123456';

-- GRANT ALL PRIVILEGES on database storefront_db to store_user;
-- GRANT ALL PRIVILEGES on database storefront_db_test to store_user_test;

-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO store_user;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO store_user_test;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO store_user;

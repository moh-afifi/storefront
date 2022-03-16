DROP DATABASE storefront_db;
DROP DATABASE storefront_db_test;

REVOKE ALL ON  ALL TABLES IN SCHEMA public FROM store_user;
REVOKE ALL ON  ALL TABLES IN SCHEMA public FROM store_user_test;
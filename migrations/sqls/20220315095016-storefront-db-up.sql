GRANT ALL PRIVILEGES on database storefront_db to store_user;
GRANT ALL PRIVILEGES on database storefront_db_test to store_user_test;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO store_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO store_user_test;

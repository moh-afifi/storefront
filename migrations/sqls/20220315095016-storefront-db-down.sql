REVOKE ALL ON database storefront_db FROM store_user;
REVOKE ALL ON database storefront_db_test FROM store_user_test;

REVOKE USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public FROM store_user;
REVOKE USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public FROM store_user_test;
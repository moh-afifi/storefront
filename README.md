# Storefront Backend Project
## Setup database instructions:

- port number for databse is :5432 

- to open postgres databse : psql postgres postgres   

- CREATE DATABASE storefront_db;

- to connect to datavse: \c storefront_db

- CREATE USER store_user WITH PASSWORD '123456';

- GRANT ALL PRIVILEGES on database storefront_db to store_user;

- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO store_user;

- run command: \q

- run command : db-migrate up


## sample of .env file
- POSTGRES_HOST=127.0.0.1
- POSTGRES_DB=storefront_db
- POSTGRES_DB_TEST= storefront_db_test
- POSTGRES_USER=store_user
- POSTGRES_PASSWORD=123456
- BCRYPT_PASSWORD=store_salt_password
- SALT_ROUNDS=10
- TOKEN_SECRET=mySecretToken123456??
- TEST_PASSWORD=123456
- ENV=dev


## Server Instructions:
- port number for local host is :3000 [localhost:3000]
- All endpoints must be as follows: localhost:3000/
- use command : 'db-migrate up' to bring database migrations up.
- use command : 'npm run build' to transpile code to js.
- use command : 'npm run start' to start the server.


## Package Installation Instructions:
- use command : 'npm install' to install all needed packages

## Run Scripts Instructions:

- use command : 'npm run prettier' to user prettier package.
- use command : 'nnpm run lint' to user eslint package.
- use command : 'npm run test' run unit test using jasmine.


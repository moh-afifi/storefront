import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import app from '../index';

const request = supertest(app);

it('test the login api endpoint', async () => {
  const response = await request.get('/login').send({
    user_name: 'user_test',
    password: '123456',
  });
  expect(response.status).toBe(200);
});

it('test register end point', async () => {
  const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
  const hash: string = bcrypt.hashSync(
    `${process.env.TEST_PASSWORD}${BCRYPT_PASSWORD}`,
    parseInt(SALT_ROUNDS as string, 10),
  );
  const response = await request.post('/register').send({
    user_name: 'user_test',
    password: hash,
    first_name: 'moh',
    last_name: 'afifi',
  });
  expect(response.status).toBe(200);
});

it('test get all users', async () => {
  const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
  const token: string = jwt.sign('token', process.env.TOKEN_SECRET as string);
  const hash: string = bcrypt.hashSync(
    `${process.env.TEST_PASSWORD}${BCRYPT_PASSWORD}`,
    parseInt(SALT_ROUNDS as string, 10),
  );
  const response = await request.get('/allUsers').set('Authorization', `Bearer ${token}`).send({
    user_name: 'user_test',
    password: hash,
    first_name: 'moh',
    last_name: 'afifi',
  });
  expect(response.status).toBe(200);
});

it('test get single user', async () => {
  const token: string = jwt.sign('token', process.env.TOKEN_SECRET as string);
  const response = await request.get('/singleProduct?id=1').set('Authorization', `Bearer ${token}`);

  expect(response.status).toBe(200);
});

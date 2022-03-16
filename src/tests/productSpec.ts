import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../index';

const request = supertest(app);

it('test get all products', async () => {
  const response = await request.get('/allProducts');
  expect(response.status).toBe(200);
});

it('test get single product', async () => {
  const token: string = jwt.sign('token', process.env.TOKEN_SECRET as string);
  const response = await request.get('/singleUser?id=1').set('Authorization', `Bearer ${token}`);

  expect(response.status).toBe(200);
});

it('test create product', async () => {
  const token: string = jwt.sign('token', process.env.TOKEN_SECRET as string);
  const response = await request.post('/addProduct').set('Authorization', `Bearer ${token}`).send({
    product_name: 'product_test',
    category: 'categ test',
    price: '100',
  });
  expect(response.status).toBe(200);
});

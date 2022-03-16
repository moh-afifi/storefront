import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../index';

const request = supertest(app);

it('test get all orders', async () => {
  const token: string = jwt.sign('token', process.env.TOKEN_SECRET as string);
  const response = await request.get('/allOrders').set('Authorization', `Bearer ${token}`);
  expect(response.status).toBe(200);
});

it('test get order by user', async () => {
  const token: string = jwt.sign('token', process.env.TOKEN_SECRET as string);
  const response = await request.get('/orderByUser?id=1').set('Authorization', `Bearer ${token}`);

  expect(response.status).toBe(200);
});

it('test create order', async () => {
  const token: string = jwt.sign('token', process.env.TOKEN_SECRET as string);
  const response = await request.post('/addOrder').set('Authorization', `Bearer ${token}`).send({
    status: 'active',
    user_id: '1',
  });
  expect(response.status).toBe(200);
});

it('test create order product', async () => {
  const token: string = jwt.sign('token', process.env.TOKEN_SECRET as string);
  const response = await request.post('/orders/1/products').set('Authorization', `Bearer ${token}`).send({
    productId: '1',
    quantity: '10',
  });
  expect(response.status).toBe(200);
});

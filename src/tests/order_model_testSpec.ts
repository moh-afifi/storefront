import PG, { Client } from 'pg';
import { Order, OrderProduct, OrderStore } from '../models/order';

const orderStore: OrderStore = new OrderStore();

it('test get all orders - model', async () => {
  const mClient: jasmine.SpyObj<Client> = jasmine.createSpyObj('client', ['connect', 'query']);
  spyOn(PG, 'Client').and.returnValue(mClient);

  const result: Order[] = await orderStore.index();

  expect(result[0]).toEqual({
    id: 1,
    order_status: 'open',
    user_id: 1,
  });
});

it('test add new order - model', async () => {
  const mClient: jasmine.SpyObj<Client> = jasmine.createSpyObj('client', ['connect', 'query']);
  spyOn(PG, 'Client').and.returnValue(mClient);
  const body: Order = {
    order_status: 'closed',
    user_id: 1,
  };
  const result: Order = await orderStore.addOrder(body);

  expect(result.order_status).toEqual('closed');
  expect(result.user_id).toEqual(1);
});

it('test add new order product - model', async () => {
  const mClient: jasmine.SpyObj<Client> = jasmine.createSpyObj('client', ['connect', 'query']);
  spyOn(PG, 'Client').and.returnValue(mClient);

  const result: OrderProduct = await orderStore.addOrderProduct(20, '1', '1');

  expect(result.quantity).toEqual(20);
  expect(`${result.order_id}`).toEqual('1');
  expect(`${result.product_id}`).toEqual('1');
});

it('test get order by user - model', async () => {
  const mClient: jasmine.SpyObj<Client> = jasmine.createSpyObj('client', ['connect', 'query']);
  spyOn(PG, 'Client').and.returnValue(mClient);

  const result: Order[] = await orderStore.getOrderByUser(1);

  expect(result[0].id).toEqual(1);
});

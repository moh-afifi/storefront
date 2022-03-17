import PG, { Client } from 'pg';
import { Order, OrderProduct, OrderStore } from '../models/order';

const orderStore: OrderStore = new OrderStore();

describe("test get all orders - model", function () {


  beforeEach(async function () {
    const body: Order = {
      order_status: 'open',
      user_id: 1,
    };
    await orderStore.addOrder(body);
  });

  it('test get all orders - model', async () => {

    const result: Order[] = await orderStore.index();
    expect(result[0]).toEqual({
      id: 1,
      order_status: 'open',
      user_id: 1,
    });
  });


});


describe("test add new order - model", function () {
  let result: Order;
  beforeEach(async function () {
    const body: Order = {
      order_status: 'closed',
      user_id: 1,
    };
    result = await orderStore.addOrder(body);
  });


  it('test add new order - model', async () => {
    expect(result.order_status).toEqual('closed');
    expect(result.user_id).toEqual(1);
  });

});


describe("test add new order product - model", function () {
  let result: OrderProduct;
  beforeEach(async function () {
    const mClient: jasmine.SpyObj<Client> = jasmine.createSpyObj('client', ['connect', 'query']);
    spyOn(PG, 'Client').and.returnValue(mClient);
    result = await orderStore.addOrderProduct(20, '1', '1');
  });
  it('test add new order product - model', async () => {
    expect(result.quantity).toEqual(20);
    expect(`${result.order_id}`).toEqual('1');
    expect(`${result.product_id}`).toEqual('1');
  });

});

describe("test get order by user - model", function () {

  beforeEach(async function () {
    const body: Order = {
      order_status: 'closed',
      user_id: 1,
    };
    await orderStore.addOrder(body);
  });


  it('test get order by user - model', async () => {
    const result: Order[] = await orderStore.getOrderByUser(1);
    expect(result[0].id).toEqual(1);
  });

});



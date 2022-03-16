import supertest from 'supertest';
import PG, { Client } from 'pg';
import app from '../index';
import { ClothesStore, Product } from '../models/product';

const orderStore: ClothesStore = new ClothesStore();

it('test get all products - model', async () => {
  const mClient: jasmine.SpyObj<Client> = jasmine.createSpyObj('client', ['connect', 'query']);
  spyOn(PG, 'Client').and.returnValue(mClient);

  const result: Product[] = await orderStore.index();

  expect(result[0]).toEqual({
    id: 1,
    product_name: 'shirt',
    category: 'clothes',
    price: 100,
  });

});

it('test add new product - model', async () => {
  const mClient: jasmine.SpyObj<Client> = jasmine.createSpyObj('client', ['connect', 'query']);
  spyOn(PG, 'Client').and.returnValue(mClient);
  const body: Product = {
    product_name: 'shirt',
    category: 'clothes',
    price: 100,
  };
  const result: Product = await orderStore.create(body);

  expect(result.product_name).toEqual('shirt');
  expect(result.category).toEqual('clothes');
  expect(result.price).toEqual(100);
});

it('test get single product - model', async () => {
  const mClient: jasmine.SpyObj<Client> = jasmine.createSpyObj('client', ['connect', 'query']);
  spyOn(PG, 'Client').and.returnValue(mClient);

  const result: Product[] = await orderStore.show(1);

  expect(result[0].id).toEqual(1);
});

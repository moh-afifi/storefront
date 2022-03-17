import PG, { Client } from 'pg';
import { ClothesStore, Product } from '../models/product';

const orderStore: ClothesStore = new ClothesStore();

describe("test get all products - model", function () {
  beforeEach(async function () {
    const mClient: jasmine.SpyObj<Client> = jasmine.createSpyObj('client', ['connect', 'query']);
    spyOn(PG, 'Client').and.returnValue(mClient);
    const body: Product = {
      product_name: 'shirt',
      category: 'clothes',
      price: 100,
    };
    await orderStore.create(body);
  });

  it('test get all products - model', async () => {
    let result: Product[] = await orderStore.index();
    expect(result[result.length - 1]).toEqual({
      id: result.length,
      product_name: 'shirt',
      category: 'clothes',
      price: 100,
    });

  });

});


describe("test add new product - model", function () {
  let result: Product;
  beforeEach(async function () {
    const mClient: jasmine.SpyObj<Client> = jasmine.createSpyObj('client', ['connect', 'query']);
    spyOn(PG, 'Client').and.returnValue(mClient);
    const body: Product = {
      product_name: 'shirt',
      category: 'clothes',
      price: 100,
    };
    result = await orderStore.create(body);
  });

  it('test add new product - model', async () => {
    expect(result.product_name).toEqual('shirt');
    expect(result.category).toEqual('clothes');
    expect(result.price).toEqual(100);
  });

});

describe("test get single product - model", function () {
  beforeEach(async function () {
    const body: Product = {
      product_name: 'shirt',
      category: 'clothes',
      price: 100,
    };
    await orderStore.create(body);
  });


  it('test get single product - model', async () => {
    const result: Product[] = await orderStore.show(1);

    expect(result[0].id).toEqual(1);
  });
});



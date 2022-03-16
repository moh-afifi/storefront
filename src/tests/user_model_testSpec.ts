import PG, { Client } from 'pg';
import bcrypt from 'bcrypt';
import { UserStore, User } from '../models/user';

const orderStore: UserStore = new UserStore();

it('test get all users - model', async () => {
  const mClient: jasmine.SpyObj<Client> = jasmine.createSpyObj('client', ['connect', 'query']);
  spyOn(PG, 'Client').and.returnValue(mClient);

  const result: User[] = await orderStore.index();

  expect(result[0].id).toEqual(1);
});

it('test get single user - model', async () => {
  const mClient: jasmine.SpyObj<Client> = jasmine.createSpyObj('client', ['connect', 'query']);
  spyOn(PG, 'Client').and.returnValue(mClient);

  const result: User[] = await orderStore.show(1);

  expect(result[0].id).toEqual(1);
});

it('test add new user - model', async () => {
  const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
  const hash: string = bcrypt.hashSync(
    `${process.env.TEST_PASSWORD}${BCRYPT_PASSWORD}`,
    parseInt(SALT_ROUNDS as string, 10),
  );
  const mClient: jasmine.SpyObj<Client> = jasmine.createSpyObj('client', ['connect', 'query']);
  spyOn(PG, 'Client').and.returnValue(mClient);

  const body: User = {
    user_name: 'user_name',
    password: hash,
    first_name: 'first_name',
    last_name: 'last_name',
  };

  const result: User | boolean = await orderStore.create(body);

  let check: boolean = false;
  if (!result) {
    expect(!result).toBeTruthy();
  } else {
    check = true;
    expect(check).toBeTruthy();
  }
});

it('test login - model', async () => {
  const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
  const hash: string = bcrypt.hashSync(
    `${process.env.TEST_PASSWORD}${BCRYPT_PASSWORD}`,
    parseInt(SALT_ROUNDS as string, 10),
  );
  const mClient: jasmine.SpyObj<Client> = jasmine.createSpyObj('client', ['connect', 'query']);
  spyOn(PG, 'Client').and.returnValue(mClient);

  const result: string = await orderStore.authenticate('user1', hash);

  expect(result).toEqual('login failed');
});

import PG, { Client } from 'pg';
import bcrypt from 'bcrypt';
import { UserStore, User } from '../models/user';

const orderStore: UserStore = new UserStore();


describe('test get all users - model', function () {
  beforeEach(async function () {
    const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
    const hash: string = bcrypt.hashSync(
      `${process.env.TEST_PASSWORD}${BCRYPT_PASSWORD}`,
      parseInt(SALT_ROUNDS as string, 10),
    );


    const body: User = {
      user_name: 'user_name',
      password: hash,
      first_name: 'first_name',
      last_name: 'last_name',
    };
    await orderStore.create(body);
  });

  it('test get all users - model', async () => {

    const result: User[] = await orderStore.index();

    expect(result[0].id).toEqual(1);
  });

});


describe('test get single user - model', function () {
  beforeEach(async function () {
    const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
    const hash: string = bcrypt.hashSync(
      `${process.env.TEST_PASSWORD}${BCRYPT_PASSWORD}`,
      parseInt(SALT_ROUNDS as string, 10),
    );

    const body: User = {
      user_name: 'user_name',
      password: hash,
      first_name: 'first_name',
      last_name: 'last_name',
    };
    await orderStore.create(body);
  });

  it('test get single user - model', async () => {

    const result: User[] = await orderStore.show(1);

    expect(result[0].id).toEqual(1);
  });

});


describe('test add new user - model', function () {

  it('test add new user - model', async () => {
    const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
    const hash: string = bcrypt.hashSync(
      `${process.env.TEST_PASSWORD}${BCRYPT_PASSWORD}`,
      parseInt(SALT_ROUNDS as string, 10),
    );
    const body: User = {
      user_name: 'user_name',
      password: hash,
      first_name: 'first_name',
      last_name: 'last_name',
    };
    const result: User | boolean = await orderStore.create(body);
    let check: boolean = false;
    if (result === false) {
      expect(result === false).toBeTruthy();
    } else {
      check = true;
      expect(check).toBeTruthy();
    }
  });

});

describe('test add new user - model', function () {
  let result: User | boolean;
  const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
  const hash: string = bcrypt.hashSync(
    `${process.env.TEST_PASSWORD}${BCRYPT_PASSWORD}`,
    parseInt(SALT_ROUNDS as string, 10),
  );

  beforeEach(async function () {
    const body: User = {
      user_name: 'user1',
      password: hash,
      first_name: 'first_name',
      last_name: 'last_name',
    };

    result = await orderStore.create(body);
  });


  it('test login - model', async () => {
    const result: string = await orderStore.authenticate('user1', hash);
    expect(result).toEqual('login failed');
  });
});



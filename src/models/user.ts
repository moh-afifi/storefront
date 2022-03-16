// @ts-ignore
import bcrypt from 'bcrypt';
import { PoolClient, QueryResult } from 'pg';
import Client from '../database';

export type User = {
  id?: number,
  user_name: string;
  first_name: string;
  last_name: string;
  password: string;
}

export class UserStore {
  // to create new user: register
  async create(u: User): Promise<User | boolean> {
    const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
    try {
      // @ts-ignore
      const conn: PoolClient = await Client.connect();
      const sqlSelect: string = 'SELECT user_name FROM users WHERE user_name=($1)';
      const resultSelect: QueryResult<any> = await conn.query(sqlSelect, [u.user_name]);

      if (resultSelect.rows.length === 0) {
        const sql: string = 'INSERT INTO users (user_name, password,first_name,last_name) VALUES($1, $2,$3,$4) RETURNING *';
        const hash: string = bcrypt.hashSync(
          u.password + BCRYPT_PASSWORD,
          parseInt(SALT_ROUNDS as string, 10),
        );
        const result: QueryResult<any> = await conn.query(sql, [u.user_name, hash, u.first_name, u.last_name]);
        const user: User = result.rows[0];

        conn.release();
        return user;
      }
      conn.release();
      return false;
    } catch (err) {
      throw new Error(`unable create user (${u.user_name}): ${err}`);
    }
  }

  //-------------------------------------------------------------------------------
  // to authentiacte user: login
  async authenticate(username: string, password: string): Promise<string> {
    const { BCRYPT_PASSWORD } = process.env;

    try {
      const conn: PoolClient = await Client.connect();
      const sql: string = 'SELECT password FROM users WHERE user_name=($1)';
      const result: QueryResult<any> = await conn.query(sql, [username]);

      if (result.rows.length !== 0) {
        const user: User = result.rows[0];
        if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
          return 'login success';
        }
        return 'login failed';
      }
      return 'user not found';
    } catch (e) {
      return 'user not found';
    }
  }

  //---------------------------------------------------------------------------
  // to get all users:
  async index(): Promise<User[]> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string = 'SELECT * FROM users';
      const result: QueryResult<any> = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (e) {
      throw new Error(`Could not get users: Error: ${e}`);
    }
  }

  //---------------------------------------------------------------------------
  // to get single user:
  async show(userId: number): Promise<User[]> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string = 'SELECT * FROM users WHere id =($1) ';
      const result: QueryResult<any> = await conn.query(sql, [`${userId}`]);
      conn.release();
      return result.rows;
    } catch (e) {
      throw new Error(`Could not get users: Error: ${e}`);
    }
  }
}

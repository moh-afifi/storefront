// @ts-ignore
import { QueryResult } from 'pg';
import Client from '../database';

export type Product = {
  id?: number,
  product_name: string;
  category: string;
  price: number;
}

export class ClothesStore {
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn: PoolClient = await Client.connect();
      const sql: string = 'SELECT * FROM products';
      const result: QueryResult<any> = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get product: Error: ${err}`);
    }
  }

  async show(id: number): Promise<Product[]> {
    try {
      const sql: string = 'SELECT * FROM products WHERE id=($1)';
      // @ts-ignore
      const conn: PoolClient = await Client.connect();

      const result: QueryResult<any> = await conn.query(sql, [id]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const sql: string = 'INSERT INTO products (product_name, category, price) VALUES($1, $2, $3) RETURNING *';
      // @ts-ignore
      const conn: PoolClient = await Client.connect();

      const result: QueryResult<any> = await conn.query(sql, [p.product_name, p.category, p.price]);

      const product: Product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error('************ Could not add new product ***********');
    }
  }
}

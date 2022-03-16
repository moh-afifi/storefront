// @ts-ignore
import { QueryResult } from 'pg';
import Client from '../database';

export type Order = {
  id?: number;
  order_status: string;
  user_id: number;
}
export type OrderProduct = {
  id?: number;
  quantity: number;
  order_id: string;
  product_id: string;
}
export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn: PoolClient = await Client.connect();
      const sql: string = 'SELECT * FROM orders';
      const result: QueryResult<any> = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders: Error: ${err}`);
    }
  }

  async addOrder(o: Order): Promise<Order> {
    try {
      const sql: string = 'INSERT INTO orders (order_status , user_id) VALUES($1, $2) RETURNING *';
      // @ts-ignore
      const conn: PoolClient = await Client.connect();

      const result: QueryResult<any> = await conn.query(sql, [o.order_status, o.user_id]);

      const order: Order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add order ${err}`);
    }
  }

  async addOrderProduct(quantity: number, orderId: string, productId: string): Promise<OrderProduct> {
    try {
      const sql: string = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      // @ts-ignore
      const conn: PoolClient = await Client.connect();

      const result: QueryResult<any> = await conn.query(sql, [quantity, orderId, productId]);

      const order: OrderProduct = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add order product ${productId} to order ${orderId}: ${err}`);
    }
  }

  async getOrderByUser(id: number): Promise<Order[]> {
    try {
      const sql: string = 'SELECT * FROM orders WHERE user_id=($1)';
      // @ts-ignore
      const conn: PoolClient = await Client.connect();

      const result: QueryResult<any> = await conn.query(sql, [id]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find order ${id}.Error: ${err}`);
    }
  }
}

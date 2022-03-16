import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Order, OrderProduct, OrderStore } from '../models/order';

const store: OrderStore = new OrderStore();

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const authorizationHeader: string = req.headers.authorization as string;
    const token: string = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (e) {
    res.status(401);
    res.json('Invalid Token');
    console.log(e);
    return;
  }

  try {
    const orders: Order[] = await store.index();
    res.json(orders);
  } catch (e) {
    res.json('unable to get orders');
  }
};

const addOrder = async (req: Request, res: Response) => {
  const order: Order = {
    order_status: req.body.order_status,
    user_id: req.body.user_id,
  };

  try {
    const authorizationHeader: string = req.headers.authorization as string;
    const token: string = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (e) {
    res.status(401);
    res.json('Invalid Token');
    console.log(e);
    return;
  }

  try {
    const addedOrder: Order = await store.addOrder(order);
    res.json(addedOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addOrderProduct = async (req: Request, res: Response) => {
  const orderId: string = req.params.id;
  const { productId } = req.body;
  const quantity: number = parseInt(req.body.quantity, 10);

  try {
    const authorizationHeader: string = req.headers.authorization as string;
    const token: string = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (e) {
    res.status(401);
    res.json('Invalid Token');
    console.log(e);
    return;
  }

  try {
    const addedProduct: OrderProduct = await store.addOrderProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const getOrderByUser = async (req: Request, res: Response) => {
  try {
    const authorizationHeader: string = req.headers.authorization as string;
    const token: string = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (e) {
    res.status(401);
    res.json('Invalid Token');
    console.log(e);
    return;
  }

  try {
    if (!Number.isNaN(`${req.query.id}`)) {
      const result: Order[] = await store.getOrderByUser(parseInt(req.query.id as string, 10));
      res.json(result);
    } else {
      res.json('Invalid user id');
    }
  } catch (e) {
    res.json('unable to get order');
  }
};

const orderRoutes = (app: express.Application) => {
  app.post('/addOrder', addOrder);
  app.get('/orderByUser', getOrderByUser);
  app.get('/allOrders', getAllOrders);
  app.post('/orders/:id/products', addOrderProduct);
};
export default orderRoutes;

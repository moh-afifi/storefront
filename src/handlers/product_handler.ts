import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ClothesStore, Product } from '../models/product';

const store: ClothesStore = new ClothesStore();

const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products: Product[] = await store.index();
    res.json(products);
  } catch (e) {
    res.json('unable to get products');
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    if (!Number.isNaN(`${req.query.id}`)) {
      const result: Product[] = await store.show(parseInt(req.query.id as string, 10));
      res.json(result);
    } else {
      res.json('Invalid user id');
    }
  } catch (e) {
    console.log('unable to get single product');
    res.json('unable to get single product');
  }
};

const createProduct = async (req: Request, res: Response) => {
  const product: Product = {
    product_name: req.body.product_name,
    category: req.body.category,
    price: req.body.price,
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
    const newUser: Product = await store.create(product);
    res.send(newUser);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};

//--------------------------------------------------------------------------
const productsRoute = (app: express.Application) => {
  app.get('/allProducts', getAllProducts);
  app.get('/singleProduct', getSingleProduct);
  app.post('/addProduct', createProduct);
};
export default productsRoute;

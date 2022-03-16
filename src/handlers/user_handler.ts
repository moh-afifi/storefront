import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserStore, User } from '../models/user';

const store: UserStore = new UserStore();
//-------------------------------------------------------------------------------
const register = async (req: Request, res: Response) => {
  const user: User = {
    user_name: req.body.user_name,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  };
  try {
    const newUser: boolean | User = await store.create(user);
    if (!newUser) {
      res.json({ message: 'user alreday exists !' });
    } else {
      const token: string = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
      res.json({ token });
    }
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};
//-------------------------------------------------------------------------------
const login = async (req: Request, res: Response) => {
  try {
    const result: string = await store.authenticate(req.body.user_name, req.body.password);
    if (result === 'login success') {
      const token: string = jwt.sign({ user: result }, process.env.TOKEN_SECRET as string);
      res.json({ message: 'login success', token });
    } else if (result === 'login failed') {
      res.json({ message: 'login failed' });
    } else {
      res.json({ message: 'user not found' });
    }
  } catch (e) {
    res.json({ message: 'login failed' });
  }
};
//-------------------------------------------------------------------------------
const getAllUsers = async (req: Request, res: Response) => {
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
    const result: User[] = await store.index();
    res.json(result);
  } catch (e) {
    res.json('unable to get all users');
  }
};
//-------------------------------------------------------------------------------
const getSingleUser = async (req: Request, res: Response) => {
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
      const result: User[] = await store.show(parseInt(req.query.id as string, 10));
      res.json(result);
    } else {
      res.json('Invalid user id');
    }
  } catch (e) {
    res.json('unable to get user');
  }
};

//-------------------------------------------------------------------------------
const userRoutes = (app: express.Application) => {
  app.get('/login', login);
  app.get('/allUsers', getAllUsers);
  app.get('/singleUser', getSingleUser);
  app.post('/register', register);
};

export default userRoutes;

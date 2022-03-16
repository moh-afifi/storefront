import express from 'express';
import bodyParser from 'body-parser';
import productsRoute from './handlers/product_handler';
import userRoute from './handlers/user_handler';
import orderRoute from './handlers/order_handler';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());

productsRoute(app);
userRoute(app);
orderRoute(app);

app.listen(3000, () => {
  console.log(`starting app on: ${address}`);
});

export default app;

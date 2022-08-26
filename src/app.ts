import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import 'express-async-errors';
import ProductRoutes from './routes/products.route';
import UserRoutes from './routes/users.route';
import OrderRoutes from './routes/orders.route';
import LoginRoutes from './routes/login.route';

const app = express();

app.use(express.json());
app.use(ProductRoutes);
app.use(UserRoutes);
app.use(OrderRoutes);
app.use(LoginRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).send('API Trybesmith');
});

export default app;

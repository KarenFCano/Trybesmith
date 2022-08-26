import { Request, Response } from 'express';
import OrderService from '../services/orders.service';
import UserService from '../services/users.service';
import { TokenRequest } from '../middlewares/orders.middleware';

class OrderController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const result = await this.orderService.getAll();
    return res.status(200).json(result);
  };

  public create = async (req: TokenRequest, res: Response) => {
    const order = req.body;
    let id;
    if (req.user) {
      id = req.user.id;
    }
    console.log(req.user);
    await new UserService().findUserById(Number(id));
    const result = await this.orderService.create(order, Number(id));
    return res.status(201).json(result);
  };
}

export default OrderController;
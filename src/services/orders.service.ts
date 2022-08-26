import connection from '../models/connection';
import OrderModel from '../models/orders.model';
import { Order, CreateOrder } from '../interfaces/orders.interface';

class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.model.getAll();
    return result;
  }

  public async create(order: CreateOrder, id: number) {
    const result = await this.model.create(order, id);
    return result;
  }
}

export default OrderService;
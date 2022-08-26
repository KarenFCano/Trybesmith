import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Order, CreateOrder } from '../interfaces/orders.interface';

class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const query = 'SELECT o.id, o.userId, JSON_ARRAYAGG(p.id) as productsIds '
      + 'FROM Trybesmith.Orders AS o '
      + 'INNER JOIN Trybesmith.Products AS p '
      + 'ON o.id = p.orderId '
      + 'GROUP BY o.id '
      + 'ORDER BY o.userId';
      // https://www.tutorialspoint.com/mysql/mysql_aggregate_functions_json_arraygg.htm
    const result = await this.connection.execute(query);
    const [rows] = result;
    return rows as Order[];
  }
  
  public async create(order: CreateOrder, id: number) {
    const { productsIds } = order;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [id],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    productsIds.forEach(async (productId) => {
      await this.connection.execute<ResultSetHeader>(
        'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?',
        [insertId, productId],
      );
    });
    return { userId: id, productsIds };
  }
}

export default OrderModel;
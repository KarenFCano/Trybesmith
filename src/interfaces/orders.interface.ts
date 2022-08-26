interface Order {
  id?: number;
  userId: number;
  productsId: Array<number>;
}

interface CreateOrder {
  productsIds: Array<number>;
}

interface NewOrder {
  userId: number;
  productsId: Array<number>;
}

export { Order, CreateOrder, NewOrder };

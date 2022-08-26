import { Router } from 'express';
import OrderController from '../controllers/orders.controller';
import { tokenValidate, validateBody } from '../middlewares/orders.middleware';

const router = Router();

const orderController = new OrderController();

router.get('/orders', orderController.getAll);
router.post('/orders', tokenValidate, validateBody, orderController.create);

export default router;
import { Router } from 'express';
import ProductController from '../controllers/products.controller';
import validateBody from '../middlewares/product.middleware';

const router = Router();

const productController = new ProductController();

router.post('/products', validateBody, productController.create);
router.get('/products', productController.getAll);

export default router;
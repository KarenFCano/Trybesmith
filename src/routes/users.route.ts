import { Router } from 'express';
import UserController from '../controllers/users.controllers';
import userValidate from '../middlewares/user.middleware';

const router = Router();

const userController = new UserController();

router.post('/users', userValidate, userController.create);

export default router;
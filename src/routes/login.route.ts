import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import userValidate from '../middlewares/login.middleware';

const router = Router();

const loginController = new LoginController();

router.post('/login', userValidate, loginController.login);

export default router;
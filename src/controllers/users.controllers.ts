import { Request, Response } from 'express';
import UserService from '../services/users.service';
import createToken from '../middlewares/token.middleware';

class UserController {
  constructor(private userService = new UserService()) { }

  public create = async (req: Request, res: Response) => {
    const user = req.body;
    const createdUser = await this.userService.create(user);
    const { id, username } = createdUser;
    const token = createToken(Number(id), username);
    res.status(201).json({ token });
  };
}

export default UserController;
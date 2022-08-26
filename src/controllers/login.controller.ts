import { Request, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';
import LoginService from '../services/login.service';
import createToken from '../middlewares/token.middleware';

class LoginController {
  constructor(private loginService = new LoginService()) { }

  public login = async (req: Request, res: Response) => {
    const user = req.body;
    const { username } = user;
    const findUser = await this.loginService.findUser(user);
    if (findUser.length === 0) {
      return res.status(401).json({ message: 'Username or password invalid' });
    }
    const { id } = findUser[0];
    const token = createToken(Number(id), username);
    res.status(200).json({ token });
  };
}

export default LoginController;
import { NextFunction, Request, Response } from 'express';
import Login from '../interfaces/login.interface';

const validateUsername = (username: string) => {
  if (!username) {
    const message = '"username" is required';
    return ({ code: 400, message });
  }
  return null;
};

const validatePassword = (password: string) => {
  if (!password) {
    const message = '"password" is required';
    return ({ code: 400, message });
  }
  return null;
};

function userValidate(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body as Login;
  const usernameError = validateUsername(username);
  if (usernameError) {
    return res.status(usernameError.code).json({ message: usernameError.message });
  }
  const passwordError = validatePassword(password);
  if (passwordError) {
    return res.status(passwordError.code).json({ message: passwordError.message });
  }
  next();
} 

export default userValidate;
import { NextFunction, Request, Response } from 'express';
import User from '../interfaces/users.interface';

const validateUsername = (username: string) => {
  if (!username) {
    const message = '"username" is required';
    return ({ code: 400, message });
  }
  if (typeof username !== 'string') {
    const message = '"username" must be a string';
    return ({ code: 422, message });
  }
  if (username.length < 3) {
    const message = '"username" length must be at least 3 characters long';
    return ({ code: 422, message });
  }
  return null;
};

const validateClasse = (classe: string) => {
  if (!classe) {
    const message = '"classe" is required';
    return ({ code: 400, message });
  }
  if (typeof classe !== 'string') {
    const message = '"classe" must be a string';
    return ({ code: 422, message });
  }
  if (classe.length < 3) {
    const message = '"classe" length must be at least 3 characters long';
    return ({ code: 422, message });
  }
  return null;
};

const validateLevel = (level: number) => {
  if (level < 1) {
    const message = '"level" must be greater than or equal to 1';
    return ({ code: 422, message });
  }
  if (!level) {
    const message = '"level" is required';
    return ({ code: 400, message });
  }
  if (typeof level !== 'number') {
    const message = '"level" must be a number';
    return ({ code: 422, message });
  }
  return null;
};

const validatePassword = (password: string) => {
  if (!password) {
    const message = '"password" is required';
    return ({ code: 400, message });
  }
  if (typeof password !== 'string') {
    const message = '"password" must be a string';
    return ({ code: 422, message });
  }
  if (password.length < 8) {
    const message = '"password" length must be at least 8 characters long';
    return ({ code: 422, message });
  }
  return null;
};

function userValidate(req: Request, res: Response, next: NextFunction) {
  const { username, classe, level, password } = req.body as User;
  const usernameError = validateUsername(username);
  if (usernameError) {
    return res.status(usernameError.code).json({ message: usernameError.message });
  }
  const classeError = validateClasse(classe);
  if (classeError) {
    return res.status(classeError.code).json({ message: classeError.message });
  }
  const levelError = validateLevel(level);
  if (levelError) {
    return res.status(levelError.code).json({ message: levelError.message });
  }
  const passwordError = validatePassword(password);
  if (passwordError) {
    return res.status(passwordError.code).json({ message: passwordError.message });
  }
  next();
} 

export default userValidate;
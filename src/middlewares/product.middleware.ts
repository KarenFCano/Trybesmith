import { NextFunction, Request, Response } from 'express';
import Product from '../interfaces/products.interface';

const validateName = (name: string) => {
  if (!name) {
    const message = '"name" is required';
    return ({ code: 400, message });
  }
  if (typeof name !== 'string') {
    const message = '"name" must be a string';
    return ({ code: 422, message });
  }
  if (name.length < 3) {
    const message = '"name" length must be at least 3 characters long';
    return ({ code: 422, message });
  }
  return null;
};

const validateAmount = (amount: string) => {
  if (!amount) {
    const message = '"amount" is required';
    return ({ code: 400, message });
  }
  if (typeof amount !== 'string') {
    const message = '"amount" must be a string';
    return ({ code: 422, message });
  }
  if (amount.length < 3) {
    const message = '"amount" length must be at least 3 characters long';
    return ({ code: 422, message });
  }
  return null;
};

function validateBody(req: Request, res: Response, next: NextFunction) {
  const { name, amount } = req.body as Product;
  const nameError = validateName(name);
  if (nameError) {
    return res.status(nameError.code).json({ message: nameError.message });
  }
  const amountError = validateAmount(amount);
  if (amountError) {
    return res.status(amountError.code).json({ message: amountError.message });
  }
  return next();
}

export default validateBody;
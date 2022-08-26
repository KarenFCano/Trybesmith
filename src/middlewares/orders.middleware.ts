import { Response, Request, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CreateOrder } from '../interfaces/orders.interface';

export interface TokenRequest extends Request {
  user?: Decode;
}

interface Decode {
  id: number;
  username: string;
}

export const tokenValidate = (req: TokenRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      const message = 'Token not found';
      return res.status(401).json({ message });
    }
    const decodToken = jwt.verify(token, 'mySecretKey') as JwtPayload;
    req.user = decodToken.data;
  } catch (error) {
    const message = 'Invalid token';
    return res.status(401).json({ message });
  }
  next();
};

const validateProduct = (order: object) => {
  const { productsIds } = order as CreateOrder;
  if (!productsIds) {
    const message = '"productsIds" is required';
    return ({ code: 400, message });
  }
  if (!Array.isArray(productsIds)) {
    const message = '"productsIds" must be an array';
    return ({ code: 422, message });
  }
  if (productsIds.length === 0 || productsIds.some((id) => typeof id !== 'number')) {
    const message = '"productsIds" must include only numbers';
    return ({ code: 422, message });
  }
  return null;
};

export function validateBody(req: Request, res: Response, next: NextFunction) {
  const productError = validateProduct(req.body);
  if (productError) {
    return res.status(productError.code).json({ message: productError.message });
  }
  return next();
}
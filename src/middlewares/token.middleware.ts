import jwt from 'jsonwebtoken';

const secret = 'mySecretKey';

const createToken = (id: number, user: string) => {
  const payload = { id, user };
  const token = jwt.sign({ data: payload }, secret);
  return token;
};

export default createToken; 
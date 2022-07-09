import * as JWT from 'jsonwebtoken';
import { IUser } from '../interfaces/Login';
import 'dotenv/config';

export default function generateToken(payload: IUser) {
  const JWT_SECRET = process.env.JWT_SECRET as string;
  const signInOptions: JWT.SignOptions = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  return JWT.sign(payload, JWT_SECRET, signInOptions);
}

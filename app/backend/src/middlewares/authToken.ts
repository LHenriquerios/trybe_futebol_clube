import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as JWT from 'jsonwebtoken';
import 'dotenv/config';
import { IRequest, IData } from '../interfaces/Login';

const JWT_SECRET = process.env.JWT_SECRET as string;

type Decod = {
  data: IData
};

const authorization = (req:IRequest, _res:Response, next:NextFunction) => {
  const token = req.headers.authorization as string;
  if (!token) next({ status: StatusCodes.UNAUTHORIZED, message: 'Token must be a valid token' });
  const { data } = JWT.verify(token, JWT_SECRET) as Decod;
  req.user = data;

  next();
};

export default authorization;

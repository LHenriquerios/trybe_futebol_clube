import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

type ErrorHandler = {
  status: number;
  message: string;
};

const errorMiddleware = (
  err: ErrorHandler,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  if (err.message.includes('invalid token') || err.message.includes('jwt malformed')
  || err.message.includes('jwt expired')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token must be a valid token' });
  }

  console.log(err.message);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
};

export default errorMiddleware;

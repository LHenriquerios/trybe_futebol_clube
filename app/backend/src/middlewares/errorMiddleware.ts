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
    return res.status(err.status).json({ message: 'All fields must be filled' });
  }

  if (err.message.includes('Username or password invalid')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message });
  }

  console.log(err.message);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
};

export default errorMiddleware;

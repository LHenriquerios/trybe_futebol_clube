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

  if (err.message.includes('Incorrect email or password')
  || err.message.includes('It is not possible to create a match with two equal teams')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message });
  }

  if (err.message.includes('There is no team with such id!')) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
  }

  console.log(err.message);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
};

export default errorMiddleware;

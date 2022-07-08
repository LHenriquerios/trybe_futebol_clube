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
  console.log(err.message);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
};

export default errorMiddleware;

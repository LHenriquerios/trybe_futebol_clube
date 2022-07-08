import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/login';

export default class Controller {
  create = async (req: Request, res: Response, next: NextFunction) => {
    const service = new UserService();
    try {
      const token = await service.login(req.body);

      return res.status(StatusCodes.OK).json({ token });
    } catch (error) {
      next(error);
    }
  };
}

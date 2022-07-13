import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/team';

export default class Controller {
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const service = new UserService();
    try {
      const data = await service.getAll();

      return res.status(StatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    const service = new UserService();
    try {
      const { id } = req.params;
      const data = await service.getById(id);

      return res.status(StatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  };
}

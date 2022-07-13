import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/match';

export default class Controller {
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const service = new UserService();
    try {
      const { inProgress } = req.query;

      if (inProgress === 'true') {
        const data = await service.getByProgressOn();
        return res.status(StatusCodes.OK).json(data);
      }

      if (inProgress === 'false') {
        const data = await service.getByProgressOff();
        return res.status(StatusCodes.OK).json(data);
      }

      const data = await service.getAll();
      return res.status(StatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  };
}

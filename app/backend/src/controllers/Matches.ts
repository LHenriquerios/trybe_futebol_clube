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

  createMacth = async (req: Request, res: Response, next: NextFunction) => {
    const service = new UserService();

    try {
      const body = { ...req.body, inProgress: true };
      const data = await service.createMacth(body);

      return res.status(StatusCodes.CREATED).json(data);
    } catch (error) {
      next(error);
    }
  };

  finishMacth = async (req: Request, res: Response, next: NextFunction) => {
    const service = new UserService();

    try {
      const { id } = req.params;
      const data = await service.finishMatch(id);

      return res.status(StatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  };

  updateMacth = async (req: Request, res: Response, next: NextFunction) => {
    const service = new UserService();

    try {
      const { id } = req.params;
      const data = await service.updateMatch(id, req.body);

      return res.status(StatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  };
}

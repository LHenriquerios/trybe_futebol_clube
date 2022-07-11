import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/login';
import { IRequest, IData } from '../interfaces/Login';

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

  getValidade = async (req: IRequest, res: Response, next: NextFunction) => {
    const service = new UserService();
    try {
      const { id } = req.user as IData;
      const data = await service.getValidade(id);

      return res.status(StatusCodes.OK).json({ role: data.role });
    } catch (error) {
      next(error);
    }
  };
}

import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IService } from '../interfaces/Login';

export default class Controller {
  constructor(private service: IService) {
    this.service = service;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await this.service.login(req.body);

      return res.status(StatusCodes.OK).json({ token });
    } catch (error) {
      next(error);
    }
  }
}

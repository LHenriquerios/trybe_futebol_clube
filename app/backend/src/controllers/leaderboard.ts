import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/leaderboard';

export default class Controller {
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const service = new UserService();
    try {
      const data = await service.showLeaderboardHome();
      return res.status(StatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  };
}

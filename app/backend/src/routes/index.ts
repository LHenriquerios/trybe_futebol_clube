import { NextFunction, Request, Response, Application } from 'express';
import LoginController from '../controllers/Login';
import Repository from '../repository';
import LoginService from '../services/login';

export default class Router {
  LoginFactory = () => {
    const repository = new Repository();
    const service = new LoginService(repository);
    const controller = new LoginController(service);

    return controller;
  };

  login(app: Application): void {
    app.post('/login', (req: Request, res: Response, next: NextFunction) =>
      this.LoginFactory().create(req, res, next));
  }
}

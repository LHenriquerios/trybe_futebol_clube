import { IUser, IService, IModel } from '../interfaces/Login';

export default class Service implements IService {
  constructor(private model: IModel) {
    this.model = model;
  }

  login(data: Omit<IUser, 'id' & 'password'>): Promise<IUser> {
    return this.model.login(data);
  }
}

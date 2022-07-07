import Model from '../database/models/User';
import { IUser, IModel } from '../interfaces/Login';

export default class Repository implements IModel {
  constructor(private model = Model) {
    this.model = model;
  }

  async login(data: Omit<IUser, 'id' & 'password'>): Promise<IUser> {
    const { email, password } = data;
    const user = await this.model.findOne({ where: { email, password } });

    return user as IUser;
  }
}

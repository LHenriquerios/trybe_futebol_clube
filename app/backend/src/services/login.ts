import Model from '../database/models/User';
import { IUser, IModel } from '../interfaces/Login';

export default class Login implements IModel {
  login = async (data: Omit<IUser, 'id' & 'password'>): Promise<IUser> => {
    const { email, password } = data;
    const user = await Model.findOne({ where: { email, password } });
    if (!user) throw new Error('Username or password invalid');
    return user as unknown as IUser;
  };
}

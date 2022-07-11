import * as bcrypt from 'bcryptjs';
import generateToken from '../utils/generateTokenJWT';
import Model from '../database/models/User';
import { IUser, IModel } from '../interfaces/Login';

export default class Login implements IModel {
  login = async (data: Omit<IUser, 'id' & 'password'>): Promise<string> => {
    const { email, password } = data;

    const user = await Model.findOne({ where: { email } });
    if (!user) throw new Error('Incorrect email or password');
    const hash = user.dataValues.password;

    const check = await bcrypt.compare(password, hash);
    if (!check) throw new Error('Incorrect email or password');

    const token = generateToken(user.dataValues);
    return token;
  };

  getValidade = async (id: number): Promise<IUser> => {
    const data = await Model.findByPk(id);
    return data as IUser;
  };
}

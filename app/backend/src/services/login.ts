import * as bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import generateToken from '../utils/generateTokenJWT';
import Model from '../database/models/User';
import { IUser, IModel } from '../interfaces/Login';
import { ErrorHandler } from '../interfaces/errors';

export default class Login implements IModel {
  login = async (data: Omit<IUser, 'id' & 'password'>): Promise<string> => {
    const { email, password } = data;

    const user = await Model.findOne({ where: { email } });
    if (!user) {
      const error = { status: StatusCodes.UNAUTHORIZED, message: 'Incorrect email or password' };
      throw error as ErrorHandler;
    }
    const hash = user.dataValues.password;

    const check = await bcrypt.compare(password, hash);
    if (!check) {
      const error = { status: StatusCodes.UNAUTHORIZED, message: 'Incorrect email or password' };
      throw error as ErrorHandler;
    }

    const token = generateToken(user.dataValues);
    return token;
  };

  getValidade = async (id: number): Promise<IUser> => {
    const data = await Model.findByPk(id);
    return data as IUser;
  };
}

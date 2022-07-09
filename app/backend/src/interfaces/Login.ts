export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface IService {
  login(data: Omit<IUser, 'id' & 'password'>): Promise<IUser>;
}

export interface IModel {
  login(data: Omit<IUser, 'id' & 'password'>): Promise<string>;
}

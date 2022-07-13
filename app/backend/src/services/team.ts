import Model from '../database/models/Teams';
import { ITeams, IModel } from '../interfaces/Teams';

export default class Teams implements IModel {
  getAll = async (): Promise<ITeams[]> => Model.findAll();
  getById = async (id: string): Promise<ITeams> => Model.findByPk(id) as unknown as ITeams;
}

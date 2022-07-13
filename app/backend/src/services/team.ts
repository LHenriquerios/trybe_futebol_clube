import Model from '../database/models/Teams';
import { ITeams, IModel } from '../interfaces/Teams';

export default class Teams implements IModel {
  getAll = async (): Promise<ITeams[]> => Model.findAll();
}

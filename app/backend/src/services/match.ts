import Model from '../database/models/Match';
import { IMatch, IModel } from '../interfaces/Matches';

export default class Matches implements IModel {
  getAll = async (): Promise<IMatch[]> => Model.findAll();
}

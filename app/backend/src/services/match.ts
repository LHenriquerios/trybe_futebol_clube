import Model from '../database/models/Match';
import Team from '../database/models/Teams';
import { IMatch, IModel } from '../interfaces/Matches';

export default class Matches implements IModel {
  getAll = async (): Promise<IMatch[]> => Model.findAll({
    include: [{
      model: Team,
      as: 'teamHome',
      attributes: { exclude: ['id'] },
    },
    {
      model: Team,
      as: 'teamAway',
      attributes: { exclude: ['id'] },
    }],
  });

  getByProgressOn = async (): Promise<IMatch[]> => Model.findAll({
    order: [['inProgress', 'DESC']],
    include: [{
      model: Team,
      as: 'teamHome',
      attributes: { exclude: ['id'] },
    },
    {
      model: Team,
      as: 'teamAway',
      attributes: { exclude: ['id'] },
    }],
  });

  getByProgressOff = async (): Promise<IMatch[]> => Model.findAll({
    order: [['inProgress', 'ASC']],
    include: [{
      model: Team,
      as: 'teamHome',
      attributes: { exclude: ['id'] },
    },
    {
      model: Team,
      as: 'teamAway',
      attributes: { exclude: ['id'] },
    }],
  });
}

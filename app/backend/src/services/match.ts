import { StatusCodes } from 'http-status-codes';
import Model from '../database/models/Match';
import Team from '../database/models/Teams';
import TeamService from './team';
import { IMatch, IModel } from '../interfaces/Matches';
import { ErrorHandler } from '../interfaces/errors';

export default class Matches implements IModel {
  teamService = new TeamService();
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

  createMacth = async (data: IMatch): Promise<IMatch> => {
    if (data.homeTeam === data.awayTeam) {
      throw new Error('It is not possible to create a match with two equal teams');
    }
    const homeTeamExists = await this.teamService.getById(data.homeTeam);
    const awayTeamExists = await this.teamService.getById(data.awayTeam);

    if (!homeTeamExists || !awayTeamExists) {
      const error = { status: StatusCodes.NOT_FOUND, message: 'There is no team with such id!' };
      throw error as ErrorHandler;
    }

    const match = await Model.create(data);
    return match as IMatch;
  };

  finishMatch = async (id: string): Promise<object> => {
    await Model.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  };

  updateMatch = async (id: string, data: IMatch): Promise<object> => {
    await Model.update(
      { homeTeamGoals: data.homeTeamGoals, awayTeamGoals: data.awayTeamGoals },
      { where: { id } },
    );
    return { message: 'Updated' };
  };
}

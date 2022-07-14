import MatchModel from '../database/models/Match';
import TeamModel from '../database/models/Teams';
import TeamService from './team';
import { IMatch } from '../interfaces/Matches';
import { ITeams } from '../interfaces/Teams';

export default class Leaderboard {
  teamService = new TeamService();
  getAllMatches = async (): Promise<IMatch[]> => MatchModel.findAll();
  getAllTeams = async (): Promise<ITeams[]> => TeamModel.findAll({
    include: [{
      model: MatchModel,
      as: 'homeMatches',
      where: { inProgress: false },
    }],
  });

  totalGames = async (team:number) => (await this.getAllMatches()).filter(
    (matches) => matches.homeTeam === team || matches.awayTeam === team,
  ).length;
}

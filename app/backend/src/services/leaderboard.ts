import MatchModel from '../database/models/Match';
import TeamModel from '../database/models/Teams';
import TeamService from './team';

export default class Leaderboard {
  teamService = new TeamService();
  private matches:MatchModel[];
  private teams:TeamModel[];

  totalGames = (team: number) => {
    const homeTeamGames = this.matches.filter((matche) => matche.homeTeam === team);
    const awayTeamGames = this.matches.filter((matche) => matche.awayTeam === team);

    return { homeTeamGames, awayTeamGames };
  };

  gamesResultsHome = (team: number) => {
    const teamGamesHome = this.totalGames(team).homeTeamGames;

    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;

    teamGamesHome.forEach((matches) => {
      const balance = matches.homeTeamGoals - matches.awayTeamGoals;

      if (balance > 0) totalVictories += 1;
      if (balance === 0) totalDraws += 1;
      if (balance < 0) totalLosses += 1;
    });

    return { totalVictories, totalDraws, totalLosses };
  };

  gamesResultsAway = (team: number) => {
    const teamGamesAway = this.totalGames(team).awayTeamGames;

    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;

    teamGamesAway.forEach((matches) => {
      const balance = matches.awayTeamGoals - matches.homeTeamGoals;
      if (balance > 0) totalVictories += 1;
      if (balance === 0) totalDraws += 1;
      if (balance < 0) totalLosses += 1;
    });

    return { totalVictories, totalDraws, totalLosses };
  };

  homeGoalsBalance = (team: number) => {
    const teamGamesHome = this.totalGames(team).homeTeamGames;
    const goalsFavorAtHome = teamGamesHome.reduce(
      (acc, crr) => acc + crr.homeTeamGoals,
      0,
    );
    const goalsOwnAtHome = teamGamesHome.reduce(
      (acc, crr) => acc + crr.awayTeamGoals,
      0,
    );

    return { goalsFavorAtHome, goalsOwnAtHome };
  };

  goalsAwayBalance = (team: number) => {
    const teamGamesAway = this.totalGames(team).awayTeamGames;
    const goalsFavorAway = teamGamesAway.reduce(
      (acc, crr) => acc + crr.awayTeamGoals,
      0,
    );
    const goalsOwnAway = teamGamesAway.reduce(
      (acc, crr) => acc + crr.homeTeamGoals,
      0,
    );

    return { goalsFavorAway, goalsOwnAway };
  };

  showLeaderboardHome = async () => {
    this.matches = await MatchModel.findAll();
    this.teams = await TeamModel.findAll();
    return this.teams.map((team) => ({
      nome: team.teamName,
      totalPoints: (this.gamesResultsHome(team.id).totalVictories * 3)
        + this.gamesResultsHome(team.id).totalDraws,
      totalGames: this.totalGames(team.id).homeTeamGames.length,
      totalVictories: this.gamesResultsHome(team.id).totalVictories,
      totalDraws: this.gamesResultsHome(team.id).totalDraws,
      totalLosses: this.gamesResultsHome(team.id).totalLosses,
      goalsFavor: this.homeGoalsBalance(team.id).goalsFavorAtHome,
      goalsOwn: this.homeGoalsBalance(team.id).goalsOwnAtHome,
      goalsBalance: this.homeGoalsBalance(team.id).goalsFavorAtHome
        - this.homeGoalsBalance(team.id).goalsOwnAtHome,
      efficiency: ((this.gamesResultsHome(team.id).totalVictories * 3)
        + this.gamesResultsHome(team.id).totalDraws)
      / (this.totalGames(team.id).homeTeamGames.length * 3) / 100,
    }));
  };
}

export interface IService {
  getAll(data: Omit<IMatch, 'id'>): Promise<IMatch>;
}

export interface IModel {
  getAll(data: Omit<IMatch, 'id'>): Promise<IMatch[]>;
}

export interface IMatch{
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

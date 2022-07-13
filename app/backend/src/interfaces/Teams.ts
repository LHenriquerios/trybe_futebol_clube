export interface IService {
  getAll(data: Omit<ITeams, 'id'>): Promise<ITeams>;
}

export interface IModel {
  getAll(data: Omit<ITeams, 'id'>): Promise<ITeams[]>;
}

export interface ITeams{
  id: number;
  teamName: string;
}

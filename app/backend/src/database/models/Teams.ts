import { Model, DataTypes } from 'sequelize';
import db from '.';
// eslint-disable-next-line import/no-cycle
import Match from './Match';

class Team extends Model {
  // public <campo>!: <tipo>;
  public id!: number;
  public teamName!: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'Teams',
  timestamps: false,
  tableName: 'teams',
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

Match.belongsTo(Team, { foreignKey: 'id', as: 'homeTeam' });
Match.belongsTo(Team, { foreignKey: 'id', as: 'awayTeam' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Team;

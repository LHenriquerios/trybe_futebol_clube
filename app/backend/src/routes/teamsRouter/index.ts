import * as express from 'express';
import TeamController from '../../controllers/Teams';

const teamRouter = express.Router();
const teamController = new TeamController();

teamRouter.get('/teams', teamController.getAll);
teamRouter.get('/teams/:id', teamController.getById);

export default teamRouter;

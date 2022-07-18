import * as express from 'express';
import LeaderboardController from '../../controllers/leaderboard';

const leaderboardRouter = express.Router();
const leaderboardController = new LeaderboardController();

leaderboardRouter.get('/leaderboardes/home', leaderboardController.getAll);

export default leaderboardRouter;

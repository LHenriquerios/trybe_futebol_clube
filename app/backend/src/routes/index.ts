import * as express from 'express';
import leaderboardRouter from './leaderboardRouter';
import loginRouter from './loginRouter';
import matchRouter from './matchesRouter';
import teamRouter from './teamsRouter';

const router = express.Router();

router.use(loginRouter);
router.use(teamRouter);
router.use(matchRouter);
router.use(leaderboardRouter);

export default router;

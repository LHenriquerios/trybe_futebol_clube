import * as express from 'express';
import loginRouter from './loginRouter';
import matchRouter from './matchesRouter';
import teamRouter from './teamsRouter';

const router = express.Router();

router.use(loginRouter);
router.use(teamRouter);
router.use(matchRouter);

export default router;

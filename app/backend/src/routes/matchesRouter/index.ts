import * as express from 'express';
import MatchController from '../../controllers/Matches';

const matchRouter = express.Router();
const matchController = new MatchController();

matchRouter.get('/matches', matchController.getAll);
matchRouter.post('/matches', matchController.createMacth);

export default matchRouter;

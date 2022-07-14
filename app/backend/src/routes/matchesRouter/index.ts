import * as express from 'express';
import MatchController from '../../controllers/Matches';

const matchRouter = express.Router();
const matchController = new MatchController();

matchRouter.get('/matches', matchController.getAll);
matchRouter.post('/matches', matchController.createMacth);
matchRouter.patch('/matches/:id', matchController.updateMacth);
matchRouter.patch('/matches/:id/finish', matchController.finishMacth);

export default matchRouter;

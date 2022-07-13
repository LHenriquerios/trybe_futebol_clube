import * as express from 'express';
import MatchController from '../../controllers/Matches';

const matchRouter = express.Router();
const matchController = new MatchController();

matchRouter.get('/matches', matchController.getAll);

export default matchRouter;

import * as express from 'express';
import LoginController from '../controllers/Login';
import TeamController from '../controllers/Teams';
import MatchesController from '../controllers/Matches';
import validateJoi from '../middlewares/validateJoi';
import Schema from '../schemas';
import authToken from '../middlewares/authToken';

const router = express.Router();
const loginController = new LoginController();
const teamController = new TeamController();
const matchesController = new MatchesController();

router.post('/login', validateJoi(Schema), loginController.create);
router.get('/login/validate', authToken, loginController.getValidade);
router.get('/teams', teamController.getAll);
router.get('/teams/:id', teamController.getById);
router.get('/matches', matchesController.getAll);

export default router;

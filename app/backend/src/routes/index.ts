import * as express from 'express';
import LoginController from '../controllers/Login';
import TeamController from '../controllers/Teams';
import validateJoi from '../middlewares/validateJoi';
import Schema from '../schemas';
import authToken from '../middlewares/authToken';

const router = express.Router();
const loginController = new LoginController();
const teamController = new TeamController();

router.post('/login', validateJoi(Schema), loginController.create);
router.get('/login/validate', authToken, loginController.getValidade);
router.get('/teams', teamController.getAll);

export default router;

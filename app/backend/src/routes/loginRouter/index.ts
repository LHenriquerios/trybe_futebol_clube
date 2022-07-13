import * as express from 'express';
import LoginController from '../../controllers/Login';
import validateJoi from '../../middlewares/validateJoi';
import Schema from '../../schemas';
import authToken from '../../middlewares/authToken';

const loginRouter = express.Router();
const loginController = new LoginController();

loginRouter.post('/login', validateJoi(Schema), loginController.create);
loginRouter.get('/login/validate', authToken, loginController.getValidade);

export default loginRouter;

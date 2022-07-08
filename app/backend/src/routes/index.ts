import * as express from 'express';
import LoginController from '../controllers/Login';
import validateJoi from '../middlewares/validateJoi';
import Schema from '../schemas';

const router = express.Router();
const loginController = new LoginController();

router.post('/login', validateJoi(Schema), loginController.create);

export default router;

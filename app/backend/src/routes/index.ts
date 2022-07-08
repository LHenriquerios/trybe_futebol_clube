import * as express from 'express';
import LoginController from '../controllers/Login';

const router = express.Router();
const loginController = new LoginController();

router.post('/login', loginController.create);

export default router;

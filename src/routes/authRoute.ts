import { Router } from 'express';
import { forgerPassword, limitRequest, login, resetCode, signup, verifyResetCode } from '../controllers/authController';

const authRoute: Router = Router()
authRoute.post('/signup', signup);
authRoute.post('/login', limitRequest, login);
authRoute.post('/forgetPassword', forgerPassword);
authRoute.post('/verifyCode', verifyResetCode);
authRoute.put('/resetCode', resetCode);

export default authRoute;
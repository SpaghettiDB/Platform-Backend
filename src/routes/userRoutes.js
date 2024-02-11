import express from "express";
import { loginUserControllers, registerUserControllers, resetpassUserControllers, updateinfoUserControllers } from '../controllers/userControllers.js';
const routeUser = express.Router();

routeUser.post('/user/login',loginUserControllers);
routeUser.post('/user/register', registerUserControllers);
routeUser.post('/user/reset', resetpassUserControllers);
routeUser.post('/user/update', updateinfoUserControllers);

export default routeUser;
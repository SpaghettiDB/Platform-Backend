import express from "express";
import { loginController, registerController, grantController } from '../controllers/user.js';
const route = express.Router();

route.post('/login',loginController);
route.post('/register', registerController);
route.post('/grant', grantController);

export default route;
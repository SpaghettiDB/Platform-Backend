import express from "express";
import { loginController, registerController} from '../controllers/user.js';
// , resetpassController, updateinfoController 
const route = express.Router();

route.post('/login',loginController);
route.post('/register', registerController);
// route.post('/user/reset', resetpassController);
// route.post('/user/update', updateinfoController);

export default route;
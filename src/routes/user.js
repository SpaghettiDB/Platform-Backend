import express from "express";
import { loginController } from '../controllers/login.js';
const registerController = require('../controllers/register.js');
const route = express.Router();

route.post('/login',loginController);
router.post('/register', registerController);

module.exports = router;
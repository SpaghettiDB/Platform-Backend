import express from "express";
import { loginController, registerController } from "../controllers/user.js";
const route = express.Router();

route.post("/login", loginController);
route.post("/register", registerController);

export default route;

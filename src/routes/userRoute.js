import express from "express";
import {
  loginController,
  registerController,
  logoutController,
} from "../controllers/userController.js";
const route = express.Router();

route.post("/login", loginController);
route.post("/register", registerController);
route.post("/logout", logoutController);

export default route;

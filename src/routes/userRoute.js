import express from "express";
import {
  loginController,
  registerController,
  logoutController,
  grantController,
} from "../controllers/userController.js";
const route = express.Router();

route.post("/login", loginController);
route.post("/register", registerController);
route.post("/logout", logoutController);
route.post("/grant", grantController);

export default route;

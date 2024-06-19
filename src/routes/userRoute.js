import express from "express";
import {
  loginController,
  registerController,
  logoutController,
  grantController,
  updateUserController,
  getController
} from "../controllers/userController.js";
//import { tokenAuth } from "../middlewares/authMiddleware.js";
const route = express.Router();

route.post("/login",loginController);
route.post("/register",  registerController);
route.post("/logout",  logoutController);
route.post("/grant",  grantController);
route.put("/update",updateUserController)
route.get("/",getController)
export default route;

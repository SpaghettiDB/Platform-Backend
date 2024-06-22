import express from "express";
import * as control from "../controllers/databaseController.js";
import { tokenAuth } from "../middlewares/authMiddleware.js";
import {
  authorizedUser,
  databaseAccess,
} from "../middlewares/databaseMiddleware.js";

const route = express.Router();

route.get("/",
tokenAuth,
databaseAccess,
control.getDatabase);
route.post(
  "/",
  tokenAuth,
  databaseAccess,
  authorizedUser,
  control.createDatabase
);
route.put(
  "/",
  tokenAuth,
  databaseAccess,
  authorizedUser,
  control.updateDatabase
);
route.delete(
  "/:databaseID",
  tokenAuth,
  databaseAccess,
  authorizedUser,
  control.deleteDatabase
);

route.post('/query', control.executeQuery)

export default route;

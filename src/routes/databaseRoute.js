import express from "express";
import * as control from "../controllers/databaseController.js";
import { tokenAuth } from "../middlewares/authMiddleware.js";

const route = express.Router();

route.get("/", tokenAuth, control.getDatabase);
route.post("/create", tokenAuth, control.createDatabase);
route.put("/update", tokenAuth, control.updateDatabase);
route.delete("/delete", tokenAuth, control.deleteDatabase);

export default route;
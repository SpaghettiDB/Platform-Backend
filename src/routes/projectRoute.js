import express from "express";
import {
  createProject,
  updateProject,
  deleteProject,
  joinProject,
  listProjects,
} from "../controllers/projectController.js";
import { tokenAuth } from "../middlewares/authMiddleware.js";

const route = express.Router();

route
  .route("/")
  .get(tokenAuth, listProjects)
  .post(tokenAuth, createProject)
  .put(tokenAuth, updateProject)
  .delete(tokenAuth, deleteProject);
route.post("/join", tokenAuth, joinProject);

export default route;

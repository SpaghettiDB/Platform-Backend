import express from "express";
import {
  createProject,
  updateProject,
  deleteProject,
  joinProject,
  listProjects,
  getProject,
  getUserProject,
  addUserProject
} from "../controllers/projectController.js";
import { tokenAuth } from "../middlewares/authMiddleware.js";

const route = express.Router();

route.post("/create", tokenAuth, createProject);
route.post("/update", tokenAuth, updateProject);
route.post("/delete/:projectID", tokenAuth, deleteProject);
route.post("/join", tokenAuth, joinProject);
route.get("/:projectID", tokenAuth, getProject)
route.get("/", tokenAuth, listProjects);
route.get("/:projectID/users/:userID", tokenAuth, getUserProject);
route.post("/:projectID/users", tokenAuth, addUserProject);

export default route;

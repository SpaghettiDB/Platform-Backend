import express from "express";
import {
  createProject,
  updateProject,
  deleteProject,
  joinProject,
  listProjectsOfTeam,
  getProject,
  getUserProject,
  addUserProject,
  listProjectsOfUser,
} from "../controllers/projectController.js";
import { tokenAuth } from "../middlewares/authMiddleware.js";

const route = express.Router();

route.post("/create", tokenAuth, createProject);
route.post("/:id/update", tokenAuth, updateProject);
route.delete("/delete/:id", tokenAuth, deleteProject);
route.post("/join", tokenAuth, joinProject);
route.get("/:projectID", tokenAuth, getProject);
route.get("/", tokenAuth, listProjectsOfUser);
route.get("/:projectID/users/:userID", tokenAuth, getUserProject);
route.post("/:projectID/users", tokenAuth, addUserProject);

export default route;

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

route.post("/create", tokenAuth, createProject);
route.post("/update", tokenAuth, updateProject);
route.post("/delete", tokenAuth, deleteProject);
route.post("/join", tokenAuth, joinProject);
route.get("/", tokenAuth, listProjects);

export default route;

import express from "express";
import {deleteProjectControllers, updateProjectControllers } from '../controllers/projectControllers.js';
const routeProject = express.Router();

routeProject.post ('/project/delete', deleteProjectControllers);
routeProject.post ('/project/update', updateProjectControllers);

export default routeProject;

import { deleteProject, updateProject } from '../models/projectModel.js';

export const updateProjectControllers= async (req, res) => {
    const {projectID, newName} = req.body;
    res.send(await updateProject(projectID, newName));

    };

  export const deleteProjectControllers= async (req, res) => {
    const {projectID} = req.body;
    await deleteProject(projectID);
    res.send('project deleted');
  };
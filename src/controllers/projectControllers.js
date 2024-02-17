import { deleteProject, updateProject } from '../models/projectModel.js';

export const updateProject = async (req, res) => {
  const { projectID, newName } = req.body;
  res.send(await updateProject(projectID, newName));

};

export const deleteProject = async (req, res) => {
  const { projectID } = req.body;
  await deleteProject(projectID);
  res.send('project deleted');
};
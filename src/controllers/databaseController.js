import { getProject } from "../models/projectModel.js";
import { memberExist } from "../models/teamModel.js";
import * as dataModel from "../models/databaseModel.js";

export const createDatabase = async (req, res) => {
  const { projectId, databaseName } = req.body;
  const project = await getProject(projectId);
  if (!project) {
    return res.status(404).json({ message: "project doesn't exist" });
  }
  const user_id = req.user.id;
  const teamMember = await memberExist(project.teamId, user_id);
  if (!teamMember) {
    return res
      .status(403)
      .json({ message: "user doesn't exist in the project" });
  }
  if (teamMember.role === "MEMBER") {
    return res
      .status(403)
      .json({ message: "user doesn't have permissions to create a database" });
  }
  const database = await dataModel.createDatabase(projectId, databaseName);
  res.status(201).json({
    message: "database created successfully",
    database: database,
  });
};

export const getDatabase = async (req, res) => {
  const { projectId } = req.query;
  const project = await getProject(+projectId);
  if (!project) {
    return res.status(404).json({ message: "project doesn't exist" });
  }
  const user_id = req.user.id;
  if (!(await memberExist(project.teamId, user_id))) {
    return res
      .status(403)
      .json({ message: "user doesn't exist in the project" });
  }
  const databases = await dataModel.allDatabases(+projectId);
  res.status(200).json({ databases: databases });
};

export const updateDatabase = async (req, res) => {
  const { databaseId, databaseName } = req.body;
  const database = await dataModel.getDatabase(databaseId);
  if (!database) {
    return res.status(404).json({ message: "database doesn't exist" });
  }
  const project = await getProject(database.projectId);
  const user_id = req.user.id;
  const teamMember = await memberExist(project.teamId, user_id);
  if (!teamMember) {
    return res
      .status(403)
      .json({ message: "user doesn't exist in the project" });
  }
  if (teamMember.role === "MEMBER") {
    return res
      .status(403)
      .json({ message: "user doesn't have permissions to update database" });
  }
  const updated_database = await dataModel.updateDatabase(
    databaseId,
    databaseName
  );
  res.status(200).json({
    message: "database updated successfully",
    updatedDatabase: updated_database,
  });
};

export const deleteDatabase = async (req, res) => {
  const { databaseId } = req.body;
  const database = await dataModel.getDatabase(databaseId);
  if (!database) {
    return res.status(404).json({ message: "database doesn't exist" });
  }
  const project = await getProject(database.projectId);
  const user_id = req.user.id;
  const teamMember = await memberExist(project.teamId, user_id);
  if (!teamMember) {
    return res
      .status(403)
      .json({ message: "user doesn't exist in the project" });
  }
  if (teamMember.role === "MEMBER") {
    return res
      .status(403)
      .json({ message: "user doesn't have permissions to delete database" });
  }
  await dataModel.deleteDatabase(databaseId);
  res.status(204);
};

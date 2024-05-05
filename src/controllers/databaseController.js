import * as dataModel from "../models/databaseModel.js";

export const getDatabase = async (req, res) => {
  const { projectId } = req.query;
  const databases = await dataModel.allDatabases(+projectId);
  res.status(200).json({ databases: databases });
};

export const createDatabase = async (req, res) => {
  const { projectId, databaseName } = req.body;
  const database = await dataModel.createDatabase(projectId, databaseName);
  res.status(201).json({
    message: "database created successfully",
    database: database,
  });
};

export const updateDatabase = async (req, res) => {
  const { projectId, databaseId, databaseName } = req.body;
  const database = await dataModel.getDatabase(databaseId);
  if (!database || database.projectId != projectId) {
    return res
      .status(404)
      .json({ message: "database doesn't exist in the project" });
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
  const databaseID = req.params.databaseID;
  const projectId = +(req.query.projectId)
  const database = await dataModel.getDatabase(databaseID);
  if (!database || database.projectId != projectId) {
    return res
      .status(404)
      .json({ message: "database doesn't exist in the project" });
  }
  await dataModel.deleteDatabase(databaseID);
  res
  .status(204)
  .json({ message: "database deleted successfully" });
};

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

export const executeQuery = async(req, res) => {
  const {dataName, query, dataId} = req.body
  await new Promise(resolve => setTimeout(resolve, 3500));
  res.json({
    error: "",
    data: [
      ["Column1", "Column2", "Column3", "Column4", "Column5", "Column6", "Column7", "Column8", "Column9", "Column10", "Column11", "Column12", "Column13", "Column14", "Column15", "Column16", "Column17", "Column18", "Column19", "Column20"], 
  [1, "A", "true", 1, "A", "true", 1, "A", "true", 1, "A", 1, "A", "true", 1, "A", "true", 1, "A", "true"],
  [2, "B", "false", 2, "B", "false", 2, "B", "false", 2, "B", 2, "B", "false", 2, "B", "false", 2, "B", "false"],
  [3, "C", "true", 3, "C", "true", 3, "C", "true", 3, "C", 3, "C", "true", 3, "C", "true", 3, "C", "true"],
  [4, "D", "false", 4, "D", "false", 4, "D", "false", 4, "D", 4, "D", "false", 4, "D", "false", 4, "D", "false"],
  [5, "E", "true", 5, "E", "true", 5, "E", "true", 5, "E", 5, "E", "true", 5, "E", "true", 5, "E", "true"],
  [6, "F", "false", 6, "F", "false", 6, "F", "false", 6, "F", 6, "F", "false", 6, "F", "false", 6, "F", "false"],
  [7, "G", "true", 7, "G", "true", 7, "G", "true", 7, "G", 7, "G", "true", 7, "G", "true", 7, "G", "true"],
  [8, "H", "false", 8, "H", "false", 8, "H", "false", 8, "H", 8, "H", "false", 8, "H", "false", 8, "H", "false"],
  [9, "I", "true", 9, "I", "true", 9, "I", "true", 9, "I", 9, "I", "true", 9, "I", "true", 9, "I", "true"],
  [10, "J", "false", 10, "J", "false", 10, "J", "false", 10, "J", 10, "J", "false", 10, "J", "false", 10, "J", "false"],
    ]
  })
}
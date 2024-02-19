import { getProject } from "../models/projectModel.js";
import { memberExist } from "../models/teamModel.js";

export const databaseAccess = async (req, res, next) => {
  let { projectId } = req.body;
  if (!projectId) {
    projectId = req.query.projectId;
  }
  const project = await getProject(+projectId);
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
  req.role = teamMember.role;
  next();
};

export const authorizedUser = async (req, res, next) => {
  if (req.role != "LEADER") {
    return res
      .status(403)
      .json({ message: "user doesn't have permissions to create a database" });
  }
  next();
};

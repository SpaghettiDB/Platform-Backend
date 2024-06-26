import * as projectModel from "../models/projectModel.js";
import * as teamModel from "../models/teamModel.js";
import * as userModel from "../models/userModel.js";

export const createProject = async (req, res) => {
  const user = req.user; // user is added to the request inside the token authorization middleware
  if (!(await userModel.getUser(user.email))) {
    res.status(400).json({ error: "User not found" });
  }
  const team = await teamModel.getTeam(parseInt(req.body.teamId));
  if (!team) {
    res.status(403).json({ error: "Team not found" });
  }
  const leader = team.members.find((member) => member.role === "LEADER").user;
  if (user.id === leader.id) {
    const project = await projectModel.createProject(
      team.id,
      req.body.projectName
    );
    res.status(201).json({ project: project });
  } else {
    res.status(401).json({ error: "Unauthorized: user is not LEADER" });
  }
};

export const updateProject = async (req, res) => {
  const projectId = parseInt(req.params.id);
  const { projectName, teamId } = req.body;
  res.send(await projectModel.updateProject(+projectId, projectName, teamId));
};
export const joinProject = async (req, res) => {
  const uuid = req.body.uuid;
  const project = await projectModel.getProjectUUID(uuid);
  if (!project) {
    res.status(400).json({ error: "Project not found" });
  }
  const user = req.user;
  if (!(await userModel.getUser(user.email))) {
    res.status(400).json({ error: "User not found" });
  }
  const team = await teamModel.getTeam(project.teamId);
  if (!team) {
    res.status(400).json({ error: "Team not found" });
  }
  const addMember = await teamModel.addMember(team.id, user.email);
  if (!addMember) {
    res.status(400).json({ error: "User already exists in the team" });
  } else {
    res.status(201).json({
      message: `User ${user.email} added successfully to project ${project.name} and team ${team.name}`,
    });
  }
};

export const deleteProject = async (req, res) => {
  const projectId = parseInt(req.params.id);
  res
    .status(200)
    .json({ Deleted: await projectModel.deleteProject(projectId) });
};

export const listProjectsOfTeam = async (req, res) => {
  const activeTeam = parseInt(req.query.teamId);
  res.json({ projects: await projectModel.allProjectsOfTeam(activeTeam) });
};

export const listProjectsOfUser = async (req, res) => {
  const userId = parseInt(req.query.userId);
  res.json({ projects: await projectModel.allProjectsOfUser(userId) });
};

export const getProject = async (req, res) => {
  const projectID = +req.params.projectID;
  const project = await projectModel.getProject(projectID);
  if (project) {
    return res.status(200).json(project);
  }
  return res.status(404).json({ message: "project doesn't exist" });
};

export const getUserProject = async (req, res) => {
  const { projectId, userId } = req.params;
  const user = await projectModel.getUser(projectId, userId);
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).json({ message: "User not found in this project" });
};

export const addUserProject = async (req, res) => {
  const { projectId } = req.params;
  const { userId } = req.body;
  const projectUser = await addUser(projectId, userId);
  if (projectUser) {
    return res.status(201).json(projectUser);
  }
  return res.status(500).json({ error: error.message });
};

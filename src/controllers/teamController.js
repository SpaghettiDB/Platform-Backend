import * as teamModel from "../models/teamModel.js";
import { getUser } from "../models/userModel.js";
import asyncHandler from "express-async-handler";

export async function isLeader(teamId, userId) {
  const user = await teamModel.memberExist(teamId, userId);
  if (user.role === "LEADER") {
    return true;
  }
  return false;
}

export const createTeam = asyncHandler(async (req, res) => {
  const { teamName } = req.body;
  const leaderId = req.user.id;
  const newTeam = await teamModel.createTeam(teamName, leaderId);
  res.status(201).json({ message: "Team created successfully" });
});

export const addMember = asyncHandler(async (req, res) => {
  const { memberEmail } = req.body;
  const teamId = +req.params.teamId;
  const userId = req.user.id;
  if (await isLeader(teamId, userId)) {
    const addedMember = await teamModel.addMember(memberEmail, teamId);
    if (addedMember) {
      res.status(201).json({ message: "Member added successfully" });
    } else {
      res.status(409).json({ message: "Member already exists in the team" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized: user is not LEADER" });
  }
});

export const deleteMember = asyncHandler(async (req, res) => {
  const { memberEmail } = req.body;
  const teamId = +req.params.teamId;
  const userId = req.user.id;
  if (await isLeader(teamId, userId)) {
    const deletedMember = await teamModel.deleteMember(memberEmail, teamId);
    if (deletedMember) {
      res.status(201).json({ message: "Member deleted successfully" });
    } else {
      res.status(409).json({ message: "Member does not exist in the team" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized: user is not LEADER" });
  }
});

export const leaveTeam = asyncHandler(async (req, res) => {
  const { teamId } = req.body;
  const userEmail = req.user.email;
    const deletedMember = await teamModel.deleteMember(userEmail, teamId);
    if (deletedMember) {
      res.status(201).json({ message: "You left successfully" });
    } else {
      res.status(409).json({ message: "You do not exist in the team" });
    }
});

export const updateTeam = asyncHandler(async (req, res) => {
  const { newName, teamId } = req.body;
  const userId = req.user.id;
  if (await isLeader(teamId, userId)) {
    await teamModel.updateTeam(newName, teamId);
    res.status(201).json({ message: "Team updated successfully" });
  } else {
    res.status(401).json({ message: "Unauthorized: user is not LEADER" });
  }
});

export const deleteTeam = asyncHandler(async (req, res) => {
  const { teamId } = req.body;
  const userId = req.user.id;
  if (await isLeader(teamId, userId)) {
    await teamModel.deleteTeam(teamId);
    res.status(201).json({ message: "Team deleted successfully" });
  } else {
    res.status(401).json({ message: "Unauthorized: user is not LEADER" });
  }
});

export const getMembers = asyncHandler(async (req, res) => {
  const { teamId } = req.params;
  const team = await teamModel.getTeam(+teamId);
  res.status(200).json(
    team.members.map((member) => ({
      email: member.user.email,
      name: member.user.name,
      role: member.role,
    }))
  );
});

export const allTeamsOfUser = asyncHandler(async (req, res) => {
  const email = req.user.email;
  const user = await getUser(email);
  if (user.teams) {
    res.status(200).json(
      user.teams.map((team) => ({
        role: team.role,
        teamName: team.team.name,
        teamId: team.team.id
      }))
    );
  } else {
    res.status(409).json({ message: "No teams found" });
  }
});

export const teamToken = asyncHandler(async (req, res) => {
  const { teamId } = req.body;
  const userId = req.user.id;
  if (await isLeader(teamId, userId)) {
    const token = await teamModel.tokenForTeam(teamId);
    res.status(200).json({ Code: token });
  } else {
    res.status(401).json({ message: "Unauthorized: user is not LEADER" });
  }
});

export const joinTeam = asyncHandler(async (req, res) => {
  const { token } = req.body;
  const userId = req.user.id;
  const joinedTeam = await teamModel.joinTeam(token, userId);
  if (joinedTeam) {
    res.status(201).json({ message: "Joined team successfully" });
  } else {
    res.status(402).json({ message: "Invalid code" });
  }
});

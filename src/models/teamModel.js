import { prisma } from "../utils/db.js";
import { getUserId } from "./userModel.js";
import crypto from "crypto";

export async function memberExist(teamId, userId) {
  const exist = await prisma.teamMembers.findUnique({
    where: {
      teamId_userId: {
        teamId: teamId,
        userId: userId,
      },
    },
  });
  return exist;
}

export async function createTeam(teamName, leaderId) {
  if (!teamName) {
    throw new Error("Team name is required");
  }
  const team = await prisma.team.create({
    data: {
      name: teamName,
      members: {
        create: [
          {
            role: "LEADER",
            user: { connect: { id: leaderId } },
          },
        ],
      },
    },
  });
  return team;
}

export async function addMember(memberEmail, teamId) {
  const member = await getUserId(memberEmail);
  if (!(await memberExist(teamId, member.id))) {
    await prisma.teamMembers.create({
      data: {
        user: { connect: { id: member.id } },
        team: { connect: { id: teamId } },
      },
    });
    return true;
  }
  return false;
}

export async function deleteMember(memberEmail, teamId) {
  const member = await getUserId(memberEmail);
  if (await memberExist(teamId, member.id)) {
    await prisma.teamMembers.delete({
      where: {
        teamId_userId: {
          teamId: teamId,
          userId: member.id,
        },
      },
    });
    return true;
  }
  return false;
}

export async function getTeam(teamId) {
  const team = await prisma.team.findUnique({
    where: {
      id: teamId,
    },
    include: { members: { include: { user: true } } },
  });
  return team;
}

export async function updateTeam(newName, teamId) {
  if (!newName) {
    throw new Error("New name is required");
  }
  const team = await prisma.team.update({
    where: { id: teamId },
    data: { name: newName },
  });
  return team;
}

export async function deleteTeam(teamId) {
  await prisma.team.delete({
    where: { id: teamId },
  });
}

export async function tokenForTeam(teamId) {
  let token;
  do {
    token = crypto.randomBytes(8).toString("hex").substring(0, 8);
  } while (await prisma.team.findUnique({ where: { token } }));
  await prisma.team.update({
    where: { id: teamId },
    data: { token: token, expiry: new Date(Date.now() + 24 * 60 * 60 * 1000) },
  });
  return token;
}

export async function joinTeam(token, userId) {
  const team = await prisma.team.findFirst({
    where: { token: token, expiry: { gt: new Date() } },
  });
  if (team) {
    await prisma.teamMembers.create({
      data: {
        user: { connect: { id: userId } },
        team: { connect: { id: team.id } },
      },
    });
    return true;
  }
  return false;
}

export async function updateMember(team_id, user_id) {
  await prisma.teamMembers.update({
    where: {
      teamId_userId: {
        teamId: team_id,
        userId: user_id.id,
      },
      role: "LEADER",
    },
  });
  return true;
}

export async function getTeamsOfUser(userId) {
  const teams = await prisma.teamMembers.findMany({
    where: {
      userId: userId,
    },
    include: {
      team: true,
    },
  });
  return teams;
}

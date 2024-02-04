import { prisma } from "../utils/db.js";
import { getUserId } from "./userModel.js";

export async function createTeam(leader_id, Name) {
  const team = await prisma.team.create({
    data: {
      name: Name,
      members: {
        create: [
          {
            role: "LEADER",
            user: {
              connect: { id: leader_id },
            },
          },
        ],
      },
    },
  });
  return team;
}

export async function memberExist(team_id, user_id) {
  const exist = await prisma.teamMembers.findUnique({
    where: {
      teamId_userId: {
        teamId: team_id,
        userId: user_id,
      },
    },
  });
  return exist;
}

export async function addMembers(team_id, memberEmail) {
  const user_id = await getUserId(memberEmail);
  if (!user_id) {
    return false;
  }
  const exist = await memberExist(team_id, user_id.id);
  if (!exist) {
    const team = await prisma.team.update({
      where: {
        id: team_id,
      },
      data: {
        members: {
          create: [
            {
              user: {
                connect: user_id,
              },
            },
          ],
        },
      },
    });
  }
  return true;
}

export async function deleteMember(team_id, e_mail) {
  const user_id = await userId(e_mail);
  if (!user_id) {
    return false;
  } else {
    const team = await prisma.teamMembers.delete({
      where: {
        teamId_userId: {
          teamId: team_id,
          userId: user_id.id,
        },
      },
    });
    return true;
  }
}

export async function getTeam(team_id) {
  const team = await prisma.team.findUnique({
    where: {
      id: team_id,
    },
    include: { members: { include: { user: true } } },
  });
  return team;
}

export async function deleteTeam(team_id) {
  const team = await getTeam(team_id);
  if (team) {
    await prisma.team.delete({
      where: {
        id: team_id,
      },
    });
    return true;
  } else {
    return false;
  }
}

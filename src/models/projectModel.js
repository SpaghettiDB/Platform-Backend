import { prisma } from "../utils/db.js";
export async function createProject(teamId, projectName) {
  const proj = await prisma.project.create({
    data: {
      team: {
        connect: {
          id: teamId,
        },
      },
      name: projectName,
    },
  });
  return proj;
}
export async function getProject(projectId) {
  const proj = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });
  return proj;
}
export async function getProjectUUID(projectUUID) {
  const proj = await prisma.project.findFirst({
    where: {
      uuid: projectUUID,
    },
  });
  return proj;
}
export async function allProjectsOfTeam(teamId) {
  const projs = await prisma.project.findMany({
    where: {
      teamId: teamId,
    },
    include: {
      team: true,
      team: {
        include: {
          members: {
            include: {
              user: true,
              user: {
                select: {
                  id: true,
                  email: true,
                  name: true,
                  role: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return projs;
}
export const allProjectsOfUser = async (userId) => {
  const projs = await prisma.project.findMany({
    where: {
      team: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
    },
    include: {
      team: true,
      team: {
        include: {
          members: {
            include: {
              user: true,
              user: {
                select: {
                  id: true,
                  email: true,
                  name: true,
                  role: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return projs;
};
export async function deleteProject(projectId) {
  const deletedProject = await prisma.project.delete({
    where: {
      id: projectId,
    },
  });
  return deletedProject ? true : false;
}
export async function updateProject(projectId, projectName, teamId) {
  const proj = await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      name: projectName,
      teamId: teamId,
    },
  });
  return proj;
}

export async function addUser(projectId, userId) {
  const projectUser = await prisma.projectUsers.create({
    data: {
      projectId: projectId,
      userId: userId,
    },
  });
  return projectUser;
}

export async function getUser(projectId, userId) {
  const projectUser = await prisma.projectUsers.findFirst({
    where: {
      projectId: projectId,
      userId: userId,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      },
    },
  });
  return projectUser ? projectUser.user : null;
}

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

export async function allProjects(teamId) {
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

export async function deleteProject(projectId) {
  await prisma.project.delete({
    where: {
      id: projectId,
    },
  });
}

export async function updateProject(projectId, projectName) {
  const proj = await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      name: projectName,
    },
  });
  return proj;
}

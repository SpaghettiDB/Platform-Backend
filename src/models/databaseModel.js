import { prisma } from "../utils/db.js"
export async function createDatabase(projectId, databaseName) {
  const db = await prisma.database.create({
    data: {
      project: {
        connect: {
          id: projectId,
        },
      },
      name: databaseName,
      storage: 0,
    },
  })
  return db
}
export async function getDatabase(databaseId) {
  const db = await prisma.database.findUnique({
    where: {
      id: databaseId,
    },
  })
  return db
}
export async function allDatabases(projectId) {
  const dbs = await prisma.database.findMany({
    where: {
      projectId: projectId,
    },
  })
  return dbs
}
export async function deleteDatabase(databaseId) {
  await prisma.database.delete({
    where: {
      id: databaseId,
    },
  })
}
export async function updateDatabase(databaseId, databaseName) {
  const db = await prisma.database.update({
    where: {
      id: databaseId,
    },
    data: {
      name: databaseName,
    },
  })
  return db
}

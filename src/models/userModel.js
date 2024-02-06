import { prisma } from '../utils/db.js'

export async function createUser (userData) {
  /* userData is an object with the following properties:
  {
    name: "NAME",
    email: "EMAIL",
    password: "PASSWORD"
  } */
  ///try
  const user = await prisma.user.create({
    data: userData
  })
  return user
}

export async function allUsers () {
  const users = await prisma.user.findMany()
  return users
}

export async function getUser (e_mail) {
  const user = await prisma.user.findUnique({
    where: {
      email: e_mail
    },
    include: { teams: { include: { team: true } } }
  })
  return user
}

export async function getUserId (e_mail) {
  const user_id = await prisma.user.findUnique({
    where: {
      email: e_mail
    },
    select: {
      id: true
    }
  })
  return user_id
}

export async function deleteUser (e_mail, pass) {
  const user = await getUser(e_mail)
  if (user && user.password === pass) {
    await prisma.user.delete({
      where: {
        email: e_mail,
        password: pass
      }
    })
    return true
  }
  return false
}

export async function updateUser (e_mail, userData) {
  /* userData is an object with the following optional properties:
  {
    name: "NAME",
    password: "PASSWORD"
  } */
  if (await getUser(e_mail)) {
    const updated_user = await prisma.user.update({
      where: {
        email: e_mail
      },
      data: userData
    })
    return updated_user
  }
  return false
}

import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
const secretKey = process.env.SECRET_KEY;

export const tokenAuth = (req, res, next) => {
  const token = req.cookies["access-token"];
  if (!token) {
    return res.status(400).send("Unauthenticated access token");
  }
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: err });
    }
    req.user = user;
    req.authenticated = true;
    return next();
  });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user === null) {
    res.status(400).send("Email does not exist");
  } else {
    try {
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { email: email, password: password },
          secretKey,
          {
            expiresIn: "1h",
          }
        );
        res
          .cookie("access-token", token, {
            maxAge: 3600000,
            httpOnly: true,
          })
          .json({ accessToken: token });
      }
    } catch (err) {
      res.status(400).send("Invalid password");
    } finally {
      prisma.$disconnect;
    }
  }
};

export const registerController = async (req, res) => {
  const { email, username, password } = req.body;
  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (userExists) {
    res.send("This Email already exists");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await prisma.user.create({
        data: {
          email: email,
          name: username,
          password: hashedPassword,
        },
      });
      res.status(201).send("User created successfully");
    } catch {
      res.status(500).send();
    } finally {
      prisma.$disconnect;
    }
  }
};

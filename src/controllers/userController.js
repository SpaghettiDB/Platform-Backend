import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const secretKey = process.env.SECRET_KEY;
import * as userModel from "../models/userModel.js";
import * as teamModel from "../models/teamModel.js";

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.getUser(email);
  if (user === null) {
    res.status(400).json({ error: "Email does not exist" });
  } else {
    try {
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(user, secretKey, {
          expiresIn: "1h",
        });
        res
          .cookie("access-token", token, {
            maxAge: 3600000,
            httpOnly: true,
          })
          .json({ accessToken: token });
      }
    } catch (err) {
      res.status(400).json({ error: "Invalid password" });
    }
  }
};

export const registerController = async (req, res) => {
  const { email, username, password } = req.body;
  const userExists = await userModel.getUser(email);
  if (userExists) {
    res.json({ message: "This Email already exists" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const createdUser = await userModel.createUser({
        email: email,
        name: username,
        password: hashedPassword,
      });
      await teamModel.createTeam(createdUser.id, createdUser.name);
      res
        .status(201)
        .json({ message: `User ${createdUser.email} created successfully` });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
};

export const logoutController = async (req, res) => {
  res.clearCookie("access-token");
  res.status(200).json({ message: `Logged out successfully` });
};
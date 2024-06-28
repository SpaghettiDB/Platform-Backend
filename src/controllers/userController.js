import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const secretKey = process.env.SECRET_KEY;
import * as userModel from "../models/userModel.js";
import * as teamModel from "../models/teamModel.js";
import { memberExist, updateMember } from "../models/teamModel.js";

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  const userObject = await userModel.getUser(email);
  if (userObject === null) {
    res.status(404).json({ error: "Email does not exist" });
  } else {
    try {
      const user = {
        email: email,
        password: userObject.password,
        name: userObject.name,
        id: userObject.id,
      };
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(user, secretKey, {
          expiresIn: "1h",
        });
        res
          .cookie("token", token, {
            maxAge: 3600000,
            httpOnly: true,
          })
          .json({ Token: token });

      }
    } catch (err) {
      res.status(401).json({ error: "Invalid password" });
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
      await teamModel.createTeam(createdUser.name, createdUser.id);
      res
        .status(201)
        .json({ message: `User ${createdUser.email} created successfully` });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
};

export const logoutController = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: `Logged out successfully` });
};

export const grantController = async (req, res) => {
  const { team_id, user_id } = req.body;
  const existingMember = await memberExist(team_id, user_id);

  if (!existingMember) {
    return res
      .status(404)
      .json({ message: "No team member with the given user id" });
  }
  await updateMember(team_id, user_id);
  res.status(200).json({ message: `Successfully updated the role` });
};

export const updateUserController = async (req, res) => {
  const { newEmail, newPassword, newName } = req.body;
   const hashedPassword = await bcrypt.hash(newPassword, 10);
    try {
      const updatedUser = await userModel.updateUser(
        newEmail,
        {
        name: newName,
        password: hashedPassword,
      });
      res
        .status(201)
        .json({ message: `User ${updatedUser.name} modified successfully` });
    } catch (err) {
     
      res.status(500).json({ error: err });
    }
};


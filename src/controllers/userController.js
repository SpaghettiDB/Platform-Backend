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
        const token = jwt.sign(user, secretKey);
        res.cookie("token", token).json({ token: token });
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
      console.log(err);
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
  const { email, userData } = req.body;
  await updateUser(email, userData);
  res.status(200).json({ message: "User data updated successfully" });
};
// export const getController = async (req, res) => {
//   const user = req.user;
//   user_info=await userModel.getUser(user.email);
//   res.status(200).json({user_info: user_info });
// };
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const secretKey = process.env.SECRET_KEY;
import * as userModel from "../models/userModel.js";

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
  const user = await userModel.getUser(email);
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
    }
  }
};

export const registerController = async (req, res) => {
  const { email, username, password } = req.body;
  const userExists = await userModel.getUser(email);
  if (userExists) {
    res.send("This Email already exists");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const createdUser = await userModel.createUser({
        email: email,
        name: username,
        password: hashedPassword,
      });
      res.status(201).send(`User ${createdUser.email} created successfully`);
    } catch {
      res.status(500).send();
    }
  }
};

export const logoutController = async (req, res) => {
  res.clearCookie("access-token");
  res.status(200).send(`Logged out successfully`);
};

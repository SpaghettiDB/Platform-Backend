
import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import { tokenAuth } from "./middlewares/authMiddleware.js";
import projectRoute from "./routes/projectRoute.js";
import DatabaseRoute from "./routes/databaseRoute.js";
import teamRoute from "./routes/teamRoute.js";
const app = express();
const port = 3000;
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", userRoute);

app.get("/", tokenAuth, (req, res) => {
  res.send(`Logged in as: ${req.user.email}`);
});

app.use("/team", teamRoute);
app.use("/project", projectRoute);
app.use("/database", DatabaseRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: "Internal server error" });
});

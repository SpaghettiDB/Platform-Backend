import express from "express";
import bodyParser from "body-parser";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import { tokenAuth } from "./middlewares/authMiddleware.js";
import projectRoute from "./routes/projectRoute.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", userRoute);

app.get("/", tokenAuth, (req, res) => {
  res.send(`Logged in as: ${req.user.email}`);
});

app.use("/project", projectRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

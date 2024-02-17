import express from "express";
<<<<<<< HEAD
import user from './routes/userRoutes.js';
import project from './routes/projectRoutes.js';
import bodyParser from 'body-parser';
=======
import bodyParser from "body-parser";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import { tokenAuth } from "./middlewares/authMiddleware.js";
import projectRoute from "./routes/projectRoute.js";
>>>>>>> origin

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", userRoute);

<<<<<<< HEAD
app.use('/user',user);
app.use('/project', project);


app.get("/", (req, res) => {
  res.send("Response OK");
=======
app.get("/", tokenAuth, (req, res) => {
  res.send(`Logged in as: ${req.user.email}`);
>>>>>>> origin
});

app.use("/project", projectRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
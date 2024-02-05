import express from "express";
import bodyParser from "body-parser";
import register from "./routes/user.js";
import cookieParser from "cookie-parser";
import { tokenAuth } from "./controllers/user.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", register);

app.get("/", tokenAuth, (req, res) => {
  res.send(`Logged in as: ${req.user.email}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

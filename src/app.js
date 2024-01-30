import express from "express";
import login from './routes/login.js';



const app = express();
const port = 3000;

app.use(express.json());

app.use('/',login);

app.get("/", (req, res) => {
  res.send("Response OK");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

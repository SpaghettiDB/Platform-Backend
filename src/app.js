import express from "express";
import user from './routes/userRoutes.js';
import project from './routes/projectRoutes.js';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user',user);
app.use('/project', project);


app.get("/", (req, res) => {
  res.send("Response OK");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
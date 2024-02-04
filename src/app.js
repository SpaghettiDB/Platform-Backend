import express from "express";
import login from './routes/login.js';
const bodyParser = require('body-parser');
const register = require('./routes/user.js');



const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',login);
app.use('/', register);

app.get("/", (req, res) => {
  res.send("Response OK");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

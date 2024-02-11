import { updateUser } from '../models/userModel';


export const loginUserControllers  = (req,res) => {
  const ref_email = "1234@gmail.com"
  const ref_pass = "1234";
  let {email, pass } = req.body;
  if (email === ref_email && pass == ref_pass)
  {
      res.send('true\n');
  }
  else{
      res.send('entre valid email and password\n')
  }
}


const users = [];
export const registerUserControllers = (req, res) => {
  const { email, username, password } = req.body;

  if (users.find((user) => user.email === email)) {
    res.send('Email is already registered.');
  }

  users.push({ email, username, password });

  res.status(201).send('User registered successfully.');
};

export const resetpassUserControllers = async (req, res) => {
  const {email, newPassword} = req.body;
  const newUser = await updateUser(email, {password: newPassword})
  if (newUser) {
    res.send('password updated');  
  }
  else {
    res.send('user not existed, please regestir');  
  };
};


export const updateinfoUserControllers = async (req, res) => {
  const {email, newName} = req.body;
  const newUser = await updateUser(email, {name: newName})
  if (newUser) {
    res.send('name updated');  
  }
  else {
    res.send('user not existed, please regestir');  
  };
};

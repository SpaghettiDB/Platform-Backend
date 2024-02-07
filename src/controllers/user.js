import { createUser, getUser } from "../models/userModel";

export const loginController = (req, res) => {
  const ref_email = "1234@gmail.com"
  const ref_pass = "1234";
  let { email, pass } = req.body;
  if (email === ref_email && pass == ref_pass) {
    res.send('true\n');
  }
  else {
    res.send('entre valid email and password\n')
  }
}



export const registerController = async (req, res) => {

  const { username, email, password } = req.body;
  const existingUser = await getUser(email);
  if (existingUser) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await createUser({
    name: username,
    email: email,
    password: hashedPassword
  });

  const token = jwt.sign({ email: newUser.email }, 'averysecretkey', { expiresIn: '2h' });

  res.status(201).json({ message: 'User created successfully', token });
};
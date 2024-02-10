import { memberExist, updateMember } from "../models/teamModel";
import { getUser, userRole } from "../models/userModel";

export const loginController  = async (req,res) => {
  const { username, email, password } = req.body;
  const User = await getUser(email);

  if (User) {
  	const token = jwt.sign({ email: User.email }, 'averysecretkey', { expiresIn: '2h' });
	  res.json({ token });
    
    const role= await userRole(email);
  	console.log(`User's role: ${role}`);

   } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
}


const users = [];
export const registerController = (req, res) => {
  const { email, username, password } = req.body;

  if (users.find((user) => user.email === email)) {
    res.send('Email is already registered.');
  }

  users.push({ email, username, password });

  res.status(201).send('User registered successfully.');
};

export const grantController = async (req, res) => {
  const { team_id, user_id} = req.body;
  const existingMember = await memberExist(team_id, user_id);

  if (!existingMember) {
    console.log('No team member with the given user id');
  }
  await updateMember(team_id, user_id);
    console.log('Successfully updated the role');
};
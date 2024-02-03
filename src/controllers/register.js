const users = [];

export const registerController = (req, res) => {
  const { email, username, password } = req.body;

  if (users.find((user) => user.email === email)) {
    res.send('Email is already registered.');
  }

  users.push({ email, username, password });

  res.status(201).send('User registered successfully.');
};

module.exports = { registerController };
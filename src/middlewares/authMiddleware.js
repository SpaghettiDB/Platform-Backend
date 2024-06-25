import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY;

export const tokenAuth = (req, res, next) => {
  const token = req.cookies["token"];
  
  if (!token) {
    return res.status(400).json({ error: "Token not found" });
  }
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: err });
    }
    req.user = user;
    req.authenticated = true;
    return next();
  });
};

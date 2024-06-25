import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY;

export const tokenAuth = (req, res, next) => {
  const token = req.cookies["token"];
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbXIxMUBnLmNvbSIsIm5hbWUiOiJhbXIiLCJwYXNzd29yZCI6IiQyYiQxMCRDa25FaTluQ3ZpWHFTRGgyTFVmQkl1RnJyM3kvTEhHelAwL0F5cnBOdDlMNnNjR0xwckhOVyIsInJvbGUiOiJVU0VSIiwidGVhbXMiOlt7InRlYW1JZCI6MSwidXNlcklkIjoxLCJyb2xlIjoiTEVBREVSIiwidGVhbSI6eyJpZCI6MSwibmFtZSI6ImFtciJ9fV0sImlhdCI6MTcxNjI0OTk3Mn0.u-ukoekWyDigVdqmt-tBBYO-Zq68_Q6yqHsOug3YDPk";
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

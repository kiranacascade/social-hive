const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  verifyToken: (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) return res.status(401).send("Access Denied / Unauthorized Request");

    try {
      token = token.split(" ")[1];
      if (token == "null" || !token) {
        return res.status(401).send("Access Denied");
      }

      let verifiedUser = jwt.verify(token, process.env.JWT_KEY);
      if (!verifiedUser) {
        return res.status(401).send("Access Denied");
      }
    } catch (err) {
      console.log(err);
      res.status(400).send("Invalid Token");
    }
  },
  checkVerification: async (req, res, next) => {
    if (req.user.is_verified) {
      return next();
    }
    return res.status(401).send("Your account hasn't been verified");
  },
};

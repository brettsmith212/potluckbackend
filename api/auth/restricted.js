const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secret");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: "token required" });
    return;
  } else {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "token invalid" });
        return;
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  }
};

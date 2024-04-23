const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token =
      req.cookies?.token || req.headers?.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).json({ error: "user not loged in" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = authToken;

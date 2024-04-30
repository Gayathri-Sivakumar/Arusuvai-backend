const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "user not loged in" });
    }
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.status(401).json({ error: "Unauthorized token" });
      }
      req.userId = decoded?.id;
      req.userEmail = decoded.email;
      console.log(req.userEmail);
      next();
    });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = authToken;

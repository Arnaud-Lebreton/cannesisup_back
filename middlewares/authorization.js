const jwt = require("jsonwebtoken");
const config = require("../config.json");

module.exports = (req, res, next) => {
  try {
    const [userId, token] = [
      req.body._Id,
      req.header.authorization.split(" ")[1],
    ];
    const decodedToken = jwt.verify(token, config.tokenCode);

    if (userId && userId !== decodedToken.userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

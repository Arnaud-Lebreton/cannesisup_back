const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const [userId, token] = [
      req.body._Id,
      req.header.authorization.split(" ")[1],
    ];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");

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

/*const jwt = require("jsonwebtoken");
const MemberShip = require("../models/membership");

module.exports = (req, res, next) => {
  try {
    const [userId, token] = [
      req.body.userId,
      req.header.authorization.split(" ")[1],
    ];
    const decodedToken = jwt.verify(token, "ABCDEFGHIJ");

    if (userId && userId === decodedToken.userId) {
      MemberShip.findOne({ _id: userId }, (err, user) => {
        if (err) {
          res.status(500).json({ message: "error" });
          return;
        }
        if (!user) {
          res.status(401).json({ message: "Accès interdit" });
          return;
        }
        req.user = user;
        next();
      });
    }
  } catch {
    res.status(401).json({
      message: "Accès interdit",
    });
  }
};
*/

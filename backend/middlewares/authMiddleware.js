const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

async function authMiddleware(req, res, next) {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization || "").replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Not authenticated" });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userService.getUserById(payload.id);
    if (!user) return res.status(401).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authMiddleware;

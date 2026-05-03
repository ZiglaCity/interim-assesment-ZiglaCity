const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

function signToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "7d",
  });
}

async function register(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });
  const existing = await userService.findByEmail(email);
  if (existing)
    return res.status(409).json({ message: "Email already in use" });
  const user = await userService.createUser({ name, email, password });
  const token = signToken(user);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  res
    .status(201)
    .json({ user: { id: user._id, name: user.name, email: user.email } });
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });
  const user = await userService.findByEmail(email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });
  const token = signToken(user);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  res.json({ user: { id: user._id, name: user.name, email: user.email } });
}

async function profile(req, res) {
  // `req.user` populated by auth middleware
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });
  res.json({ user: req.user });
}

async function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.json({ message: "Logged out" });
}

module.exports = { register, login, profile, logout };

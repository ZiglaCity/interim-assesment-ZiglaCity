const User = require("../models/User");

async function createUser({ name, email, password }) {
  const user = new User({ name, email, password });
  await user.save();
  return user;
}

async function findByEmail(email) {
  return User.findOne({ email });
}

async function getUserById(id) {
  return User.findById(id).select("-password");
}

module.exports = { createUser, findByEmail, getUserById };

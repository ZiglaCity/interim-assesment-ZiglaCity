const Crypto = require("../models/Crypto");

async function createCrypto(data) {
  const c = new Crypto(data);
  await c.save();
  return c;
}

async function getAllCryptos() {
  return Crypto.find().sort({ name: 1 });
}

async function getGainers(limit = 20) {
  return Crypto.find().sort({ change24h: -1 }).limit(limit);
}

async function getNewListings(limit = 20) {
  return Crypto.find().sort({ createdAt: -1 }).limit(limit);
}

module.exports = { createCrypto, getAllCryptos, getGainers, getNewListings };

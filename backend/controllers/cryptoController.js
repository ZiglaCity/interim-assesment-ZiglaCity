const cryptoService = require("../services/cryptoService");

async function getAll(req, res) {
  const list = await cryptoService.getAllCryptos();
  res.json({ data: list });
}

async function getGainers(req, res) {
  const limit = parseInt(req.query.limit, 10) || 20;
  const list = await cryptoService.getGainers(limit);
  res.json({ data: list });
}

async function getNew(req, res) {
  const limit = parseInt(req.query.limit, 10) || 20;
  const list = await cryptoService.getNewListings(limit);
  res.json({ data: list });
}

async function addCrypto(req, res) {
  const { name, symbol, price, image, change24h } = req.body;
  if (!name || !symbol || price == null)
    return res.status(400).json({ message: "name, symbol and price required" });
  const c = await cryptoService.createCrypto({
    name,
    symbol,
    price,
    image,
    change24h,
  });
  res.status(201).json({ data: c });
}

module.exports = { getAll, getGainers, getNew, addCrypto };

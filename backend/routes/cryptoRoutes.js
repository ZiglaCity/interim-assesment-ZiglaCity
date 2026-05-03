const express = require("express");
const router = express.Router();
const {
  getAll,
  getGainers,
  getNew,
  addCrypto,
} = require("../controllers/cryptoController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", getAll);
router.get("/gainers", getGainers);
router.get("/new", getNew);
router.post("/", authMiddleware, addCrypto);

module.exports = router;

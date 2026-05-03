const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const cryptoRoutes = require("./routes/cryptoRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

app.get("/api", (req, res) => {
  res.json({ message: "Crypto Assignment backend for Solomon, ID: 22012447" });
});

app.use("/api/auth", authRoutes);
app.use("/api/crypto", cryptoRoutes);

app.use(errorHandler);

module.exports = app;

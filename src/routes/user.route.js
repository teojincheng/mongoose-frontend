const express = require("express");
const router = express.Router();
require("dotenv").config();

const User = require("../models/user.model");

const createJWTToken = username => {
  const payload = { name: username };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
  return token;
};

router.post("/login", async (req, res) => {
  const { userName, userId } = req.body;
  const user = await User.findOne({ userId });
});

router.get("/", async (req, res) => {});

module.exports = router;

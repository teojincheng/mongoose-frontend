const express = require("express");
const router = express.Router();
require("dotenv").config();

const User = require("../models/user.model");

const createJWTToken = username => {
  const payload = { name: username };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
  return token;
};

router.post("/", async (req, res, next) => {
  try {
    const user = new User(req.body);
    await User.init();
    const newUser = await user.save();
    res.status(201).send(newUser);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { userName, userId } = req.body;
    const user = await User.findOne({ userId });
    const result = await bcrypt.compare(userId, user.userId);

    if (!result) {
      throw new Error("Login failed");
    }

    const token = createJWTToken(userName);

    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = oneDay * 7;
    const expiryDate = new Date(Date.now() + oneWeek);

    res.cookie("token", token, {
      expires: expiryDate,
      httpOnly: true
    });

    res.status(200).send("You are now logged in!");
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {});

module.exports = router;

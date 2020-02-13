const express = require("express");
const app = express();
app.use(express.json());

const listOfEndPoints = {
  "0": "GET /",
  "1": "GET /companies",
  "2": "GET /companies/:id",
  "3": "POST /companies/:id/reviews",
  "4": "GET /user"
};

app.get("/", (req, res, next) => {
  res.status(200).send(listOfEndPoints);
});

module.exports = app;

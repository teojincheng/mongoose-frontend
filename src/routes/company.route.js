const express = require("express");
const router = express.Router();

const Company = require("../models/company.model");

const findAllWithoutReview = async () => {
  const foundCompanies = await Company.find(Company, "-reviews");
  return foundCompanies;
};

router.get("/", async (req, res) => {
  const collection = await findAllWithoutReview();
  res.status(200).send(collection);
});

module.exports = router;

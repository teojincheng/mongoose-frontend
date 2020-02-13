const express = require("express");
const router = express.Router();

const Company = require("../models/company.model");

const findAllWithoutReview = async () => {
  const foundCompanies = await Company.find().select("-__v -_id -reviews");
  return foundCompanies;
};

const findOneCompanyWithReview = async id => {
  const foundCompany = await Company.find({ id }).select(
    "-__v -_id -reviews._id"
  );
  return foundCompany;
};

/*
const addOneReviewToCompany = async (id, review) => {
  const company = Company.find({ id });
  company.reviews.push(review);
};
*/
router.get("/", async (req, res) => {
  const collection = await findAllWithoutReview();
  res.status(200).send(collection);
});

router.get("/:id", async (req, res) => {
  const company = await findOneCompanyWithReview(req.params.id);
  res.status(200).send(company);
});

router.post("/:id/reviews", async (req, res) => {});

module.exports = router;

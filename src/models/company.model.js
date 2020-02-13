const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const review = new Schema({
  id: String,
  userId: String,
  userName: String,
  rating: Number,
  title: String,
  review: String
});

const company = new Schema({
  id: String,
  companyName: String,
  companySuffix: String,
  numberOfEmployees: Number,
  description: String,
  reviews: [review]
});

const Company = mongoose.model("Company", company);

module.exports = Company;

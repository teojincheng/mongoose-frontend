const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  userId: String,
  firstName: String,
  lastName: String,
  email: String
});

user
  .virtual("userName")
  .get(function() {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function(v) {
    // `v` is the value being set, so use the value to set
    // `firstName` and `lastName`.
    const firstName = v.substring(0, v.indexOf(" "));
    const lastName = v.substring(v.indexOf(" ") + 1);
    this.set({ firstName, lastName });
  });

const User = mongoose.model("User", user);

module.exports = User;

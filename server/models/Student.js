var mongoose = require("mongoose");

var StudentSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  phoneNumber: String,
  subjects: String,
  dob: String,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("student", StudentSchema);

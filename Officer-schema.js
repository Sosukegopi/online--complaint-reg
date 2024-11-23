const mongoose = require("mongoose");
const officerSchema = new mongoose.Schema({
  officerName: String,
  officerEmail: String,
  officerPhone: String,
  officerId: String,
});
module.exports = mongoose.model("officer", officerSchema);

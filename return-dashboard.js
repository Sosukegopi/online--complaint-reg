const Complaints = require("../../models/Complaint-schema");
const Officers = require("../../models/Authentication/Officer-schema");

const mongoose = require("mongoose");
var officers = Officers.find((err, docs) => {
  officers = docs;
});
exports.return_dashboard = (req, res) => {
  // res.send("Post")
  Complaints.find((err, doc) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.render("AdminDashboard", { complaints: doc, officers: officers });
    }
  });
};

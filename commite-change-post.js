const Complaints = require("../../models/Complaint-schema");
const mongoose = require("mongoose");

exports.commiteChange = (req, res) => {
  //   res.send("Post Route");
  //   console.log(req.params.id, req.body);
  var id = req.params.id;
  var work_status = req.body.workStatus;
  var officer_appointed = req.body.officer;
  var updated_doc = { approvalStatus: req.body.approval };
  if (work_status != "~") {
    updated_doc.workStatus = work_status;
  }
  if (officer_appointed != "~") {
    updated_doc.officerAppointed = officer_appointed;
  }
  console.log(updated_doc);
  Complaints.findByIdAndUpdate(id, updated_doc, (err, docs) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
    //   res.render("AdminDashboard", { complaints: doc });
                res.sendFile(__dirname + "/complaintSuccess.html");
      console.log("Complaint Successfully updated");
    }
  });
};

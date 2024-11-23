const Complaint = require("../../models/Complaint-schema");
const User = require("../../models/Authentication/User-schema");
const mongoose = require("mongoose");

// exports.userDashboard = (req, res) => {
//   var button = req.body.button;
//   var userId = req.body.userId;
//   //   console.log(button, userId);

//   if (button == "dashboard") {
//     res.render("AdminUserDashboard");
//   } else if (button == "delete") {
//     res.send("Delete user");
//   }
// };
exports.userDashboard = async (req, res) => {
  var button = req.body.button;
  var userId = req.body.userId;
  try {
    if (button == "dashboard") {
      var userDetails = await User.find({ userId: userId }).exec();
      // console.log(username);
      var complaints = await Complaint.find({ userID: userId }).exec();
      // console.log(complaints);
      res.render("AdminUserDashboard", { userDetails: userDetails[0], complaints: complaints });
    } else if ((button = "delete")) {
      var userDetails = await User.findOneAndDelete({ userId: userId }).exec();
      // console.log("delete button", userId);
      var complaints = await Complaint.deleteMany({ userID: userId }).exec();
      User.find((err, docs) => {
        if (err) {
          res.sendStatus(500);
        } else {
          res.render("UserList", { users: docs });
        }
      });
    }

    // Complaint.find({ userID: userId }, function (err, docs) {
    //   if (err) {
    //     console.log(err);
    //     res.sendStatus(500);
    //   } else {
    //     res.render("UserDashboard", {
    //       complaints: docs,
    //       userID: req.params.id,
    //       userName: username[0].username.slice(0, 2),
    //     });

    //     // console.log(docs);
    //   }
    // });
  } catch (error) {
    console.log(error);
  }
};

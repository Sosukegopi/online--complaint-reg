const Users = require("../../models/Authentication/User-schema");
exports.userList = (req, res) => {
  // res.send("userlist")
  Users.find((err, docs) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.render("UserList", {users:docs});
    }
  });
};

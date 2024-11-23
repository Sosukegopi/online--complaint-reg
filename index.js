const express = require("express");
const bodyParser = require("body-parser"); // to handle post requests
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser"); // to store JWT Token in our cookie storage for getting verified in each routes
const fileUplaod = require("express-fileupload");

const app = express();
require("dotenv").config(); // for environment variables
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public")); // public folder for css and images
app.set("view engine", "ejs"); // seting the engine for ejs
//
// MongoDB database connection

const uri = process.env.mongoDB;
function database_connection() {
  try {
    mongoose.set("strictQuery", false);

    mongoose.connect(uri, () => {
      console.log("Successfully connected to DB");
    });
  } catch (error) {
    console.log(`error in database connection ${error}`);
  }
}
database_connection();
app.use(
  fileUplaod({
    useTempFiles: true,
  })
);
app.use("/", require("./routes/home"));
app.use("/user/login", require("./routes/User/login-post"));
app.use("/user/signup", require("./routes/User/signup-post"));
app.use("/user", require("./routes/User/dashboard"));
// adding user-complaint
app.use("/", require("./routes/User/complaintForm-get"));
app.use("/", require("./routes/User/complaintForm-post"));
// deleting user-complaint
app.use("/", require("./routes/User/deleteComplaint"));
app.use("/officer/login", require("./routes/Officer/login-post"));
app.use("/admin/login", require("./routes/Admin/login-post"));
// Admin-altering-complaints
app.use("/", require("./routes/Admin/commite-change-post"));
// Admin-return-dashboard-after-alter-complaint
app.use("/admin-return-dashboard", require("./routes/Admin/return-dashboard"));
// Admin user list
app.use("/admin/user-list", require("./routes/Admin/userlist"));
// Admin user dashboard & delete
app.use("/", require("./routes/Admin/user-dashboard-delete"));
// Admin Appointing officer
app.use("/admin/appoint-officer",require("./routes/Admin/appoint-officer"))
app.use("/appoint-officer", require("./routes/Admin/appoint-officer-post"));
// Officer updating complaint 
app.use("/officer-update-complaint", require("./routes/Officer/update-complaint"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));



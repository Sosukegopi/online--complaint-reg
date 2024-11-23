const Admin=require("../../models/Authentication/Admin-schema")
const Officers = require("../../models/Authentication/Officer-schema");
const Complaints=require("../../models/Complaint-schema")
const mongoose=require("mongoose")
var doc=
Complaints.find((err,docs)=>{
    doc=docs
})
var officers=Officers.find((err,docs)=>{
    officers=docs
})
exports.login=(req,res)=>{
    Admin.find((err,docs)=>{
        if(err){
            res.sendStatus(500)
        }else{
            if (docs[0].name===req.body.name && docs[0].password===req.body.password) {
                res.render("AdminDashboard",{complaints:doc,officers:officers})
                // console.log(doc);
                // console.log(officers);
            } else {
                res.sendFile(__dirname+"/unauthorized.html")
            }
        }
    })
}
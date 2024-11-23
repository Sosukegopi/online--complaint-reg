const Officer = require("../../models/Authentication/Officer-schema");
const Complaints = require("../../models/Complaint-schema");

const mongoose = require("mongoose");
exports.appoint_officer = (req, res) => {
  console.log(req.body);
    const officer = new Officer({
      officerName: req.body.officerName,
      officerEmail: req.body.officerEmail,
      officerPhone: req.body.officerPhone,
      officerId: req.body.officerId,
    });
    officer.save((err,docs)=>{
        if(err){
res.sendStatus(500)
        }else{
            res.sendFile(__dirname+"/appoint-officer-success.html")
        }
         
    })
};

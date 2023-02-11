const User = require("../models/queries");
const alert = require("alert");
const multer = require("multer");
const fs = require('fs');
const path = require('path');

const Storage = multer.diskStorage({
  destination: "Uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("image");

PostQueries = async function (req, res) {
  console.log("posted successfully");
  
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      res.json({ status: "error", message: err });
    } else {
      
      await User.create(
        {
          username: req.body.subject,
          question: req.body.question,
          description: req.body.description,
          image: {
            data: fs.readFileSync(req.file.path),
            contentType: "image/jpg",
          },
        },
        (err, item) => {
          if (err) {
            console.log(err);
            res.json({ status: "error", message: err });
          } else {
            res.json({ status: "ok", message: item });
            alert("Question Posted Successfully");
          }
        }
      );
    }
  });
};

ViweQueries = (req,res)=>{
  //console.log("Inside ViewQueries");
  User.find({},function(err,result){
    if (err) {
     console.log(err);
     res.send({status : err});
    }
    else{
      res.send(result);
    }
  })
}

UpdateAnswers = (req,res)=>{
  const id = req.body;
  const answer = req.body;
  console.log(id);
  console.log(answer);
  res.json({status : "ok", message:"done"});
}

module.exports = { PostQueries , ViweQueries ,UpdateAnswers};

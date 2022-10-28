const User = require("../models/queries");

const multer = require("multer");

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
          subject: req.body.subject,
          question: req.body.question,
          description: req.body.description,
          image: {
            data: req.file.filename,
            contentType: "image/jpg",
          },
        },
        (err, item) => {
          if (err) {
            console.log(err);
            res.json({ status: "error", message: err });
          } else {
            res.json({ status: "ok", message: item });
          }
        }
      );
    }
  });
};

ViweQueries = (req,res)=>{
  console.log("Inside ViewQueries");
  User.find({},function(err,result){
    if (err) {
     console.log(err);
     res.send({status : err});
    }
    else{
      console.log(result)
      res.send({result});
    }
  })
}

module.exports = { PostQueries , ViweQueries};

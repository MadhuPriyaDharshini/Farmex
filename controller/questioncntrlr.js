const User = require("../models/queries");

const multer = require('multer');

const Storage = multer.diskStorage({
  destination : "uploads",
  filename : (req, file , cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage : Storage
}).single('image');


PostQueries = async function (req, res){

  console.log("posted successfully")
  upload(req,res,(err)=>{
    if(err){
      console.log(err)
    }
    else{
      const newImage = new User({
        subject : req.body.subject,
        question : req.body.question,
        description : req.body.description,
        image : {
          data:req.file.filename,
          contentType : 'image/jpg'
        }
      })
      newImage.save()
      .then(()=>res.json({status : " ok",message : "Data inserted"}))
      .catch(err=>{console.log(err)});
    }
  })
}

module.exports = {PostQueries };


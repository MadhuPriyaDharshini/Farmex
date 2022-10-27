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
      console.log(subject);
      console.log(question);
      console.log(description);
      console.log(image);
    }
  });
};

module.exports = { PostQueries };

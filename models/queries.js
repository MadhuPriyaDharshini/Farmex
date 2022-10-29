const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questions = new Schema(
    {
        username : {type : String},
        question : {type : String},
        description : {type : String},
        image : {
          data:Buffer,
          contentType : String
        }
    }
);

module.exports = new mongoose.model('questions',questions);


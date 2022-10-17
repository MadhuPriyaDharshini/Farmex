const mongoose = require('mongoose');

const Schema = mongoose.Schema

const UserDetails = new Schema(
    {
        UserName : {type:String},
        FirstName : {type:String},
        LastName : {type:String},
        Email : {type:String,unique:true},
        password : {type:String}
    }
    //,{timestamps:true}
);

module.exports = mongoose.model('UserDetail',UserDetails);
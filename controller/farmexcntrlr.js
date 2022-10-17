const bcrypt = require('bcryptjs');

const User = require('../models/UserDetails');

const alert =  require('alert');

const jwt = require('jsonwebtoken');

require("dotenv").config();

const JWT_SECRET = process.env.JWT_TOKEN;

createUser = async function(req,res){

  const {UserName , FirstName , LastName , Email , password} = req.body;
  
  const encryptedPassword = await bcrypt.hash(password,10);

  const NewUser = {UserName , FirstName , LastName , Email , password:encryptedPassword};

  console.log(NewUser);

  try{
    const oldUser = await User.findOne({ Email });

    if(oldUser){
      return res.send({error:"User exists"});
    }
    console.log('called')
    await User.create(NewUser);
    alert("Sign Up Successful")
    res.send('');
  }catch(error){
    res.send({status :"error"});
    console.log(error)
  }

}

validateUser = async function(req,res){
  const { Email , password} = req.body;
  console.log(req.body);

  const user = await User.findOne({ Email });

  if(!user){
    alert("User not found please sign up");
    return res.send("");
  }

  if(await bcrypt.compare(password, user.password)){
    const token = jwt.sign({},JWT_SECRET);

    if(res.status(201)){
      alert("Login Successful");
      return res.json({status:"ok", data:token });
    }else{
      return res.json({error:"error"});
    }
    
  }

  alert("Invalid Password Please enter the correct one");
  res.send('/');

}

module.exports={createUser,validateUser};
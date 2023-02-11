const bcrypt = require("bcryptjs");

const User = require("../models/UserDetails");

const alert = require("alert");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const JWT_SECRET = process.env.JWT_TOKEN;

createUser = async function (req, res) {
  const { UserName, FirstName, LastName, Email, password } = req.body;
  
  const encryptedPassword = await bcrypt.hash(password, 10);
  const NewUser = {
    UserName,
    FirstName,
    LastName,
    Email,
    password: encryptedPassword,
  };
 
  try {
    const oldUser = await User.findOne({ Email });
    //console.log(oldUser);
    if (oldUser) {
      return res.json({ error: "User exists" });
    }
    await User.create(NewUser);
     const username = NewUser.UserName;
     jwt.sign({username},JWT_SECRET,{expiresIn : '7 days'},(err,token)=>{
        if(err) throw err;
        res.json({status : "ok" , AccessToken : token });
        alert("Token Created");
     })
  } catch (error) {
    res.send({ status: "error" });
    console.log(error);
  }
};

validateUser = async function (req, res) {
  const { Email, password } = req.body;
  
  const user = await User.findOne({ Email });
  //console.log(user);
  const username = user.UserName;
  if (!user) {
    alert("User not found please sign up");
    return res.json({error : "User not found please sign up"});
  }
  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);
  if (!isMatch) {
    return res.status(400).json({ msg: " Password incorrect" });
  }

  jwt.sign(
    {username},
    JWT_SECRET,
    { expiresIn: "30 days" },
    (err, token) => {
      if (err) throw err;
      res.json({status : "ok" , AccessToken : token });
    }
  );
};

userInfo = async (req, res) => {
  const {token} =  req.body;
  //console.log(req.body);
  try{
    const user =  jwt.verify(token,JWT_SECRET);
    //console.log(user);
    const username = user.username;
    //console.log(username);
    await User.findOne({UserName : username}).then((data)=>{
      //console.log(data);
      res.json({status:"ok",data:data})
    }).catch((error)=>{
      res.json({status : error , data : error});
    });
  }catch(error){
   res.json({status : error , data : error});
  }
};

module.exports = { createUser, validateUser , userInfo };

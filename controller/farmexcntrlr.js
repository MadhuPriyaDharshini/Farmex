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
    console.log(oldUser);
    if (oldUser) {
      return res.send({ error: "User exists" });
    }
    await User.create(NewUser);
    
     jwt.sign({Email},JWT_SECRET,{expiresIn : '7 days'},(err,token)=>{
        if(err) throw err;
        res.json({token});
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
  console.log(user);
  if (!user) {
    alert("User not found please sign up");
    return res.json({error : "User not found please sign up"});
  }
  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);
  if (!isMatch) {
    return res.status(400).json({ msg: " Password incorrect" });
  }

 
  const payload = {
    user: {
      id: user.id,
    },
  };

  jwt.sign(
    payload,
    JWT_SECRET,
    { expiresIn: "30 days" },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
};

UserInfo = async (req, res) => {
  try {
    const user = await User.findOne({ UserName }).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createUser, validateUser };

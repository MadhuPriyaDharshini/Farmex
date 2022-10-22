const express = require('express');

const bodyParser = require('body-parser');

const bcrypt = require('bcryptjs');

const path = require('path');

const cors = require('cors');

const db = require('./db');

const app = express();

const farmexRouter = require('./routes/farmexroute');

app.set("views",path.join(__dirname,"views"));

app.set("view engine" , "ejs")

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());

app.use(bodyParser.json());


db.on('error',console.error.bind(console,'MongoDB connection error'))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/public/signup.html");
});

app.use('/api',farmexRouter);

app.listen(3000,function(){
    console.log("Server connected to the port 3000");
});

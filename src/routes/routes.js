const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const { User } = require("../db");
const router = express.Router();

const uploads = multer({ storage });

router.post("/add", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    //const { file_name } = req.file;
    console.log('inside add controller');

 //   res.render('/')

    console.log("name", name, "email", email, "phone", phone);
    //validations

    const user = new User({
      name,
      email,
      phone,
      
    });
    console.log("user data", user);
    await user.save().exec();
    req.session.message=
      {type:'succes',
        message:'User added Succesfully'};
    res.render('/');
  } catch (error) {
    console.log("error in adding user controller", error);

    req.session.message = {
      type:'danger',
      message:'Error in adding user'
    
    }


    
  }
});

router.get("/", async (req, res) => {
  try {
    const users=[];
    const message=null;
    res.render("index", { users,message });
  } catch (error) {
    console.log("error in Home Controller", error);
  }
  //res.status(200).json({message:'ok'});
});

router.get("/add_user",async(req,res)=>{
  console.log('rendering add_user');
  res.render("add_user");

});


router.post('add-user',async (req,res)=>{

  try{

    console.log('inside add user');

  }catch(error)
  {
    console.log("error in add user controller",error);
  }

});


module.exports = router;

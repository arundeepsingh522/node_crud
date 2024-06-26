const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const { User } = require("../db");
const router = express.Router();

//const uploads = multer({ storage });

router.post("/add", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    //const { file_name } = req.file;

    console.log("name", name, "email", email, "phone", phone);
    //validations

    const user = new User({
      name,
      email,
      phone,
      image: file_name,
    });
    console.log("user data", user);
    await user.save().exec();
    res.status(200).json({
      type: "Succes",
      message: "User added Succesfully",
    });
  } catch (error) {
    console.log("error in adding user", error);

    res.status(500).json({
      message: "internal server error",
    });
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

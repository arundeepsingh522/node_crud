const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const { User } = require("../db");
const path = require('path');
const fs = require('fs');
const router = express.Router();

const uploadsDir = path.join("/src/uploads");
console.log("==>>>>", uploadsDir);

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log("==>>>>", uploadsDir);
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const uploads = multer({ storage });
router.post('/add', uploads.single('myFile'), async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const file = req.file;
    console.log('Inside add controller');
    console.log('Name:', name, 'Email:', email, 'Phone:', phone);
    // Validations
    if (!name || !email || !phone) {
      req.session.message = {
        type: 'danger',
        message: 'Please provide all required fields'
      };
      return res.redirect('/');
    }

    if (file) {
      console.log('File uploaded:', file);
    }

    // Create a new user instance
    const user = new User({
      name,
      email,
      phone,
      image: file ? file.path : null // Save the file path if a file is uploaded
    });

    console.log('User data:', user);
    await user.save();

    req.session.message = {
      type: 'success',
      message: 'User added successfully'
    };

    res.status(200).json({
      message:'ok'
    });

    res.redirect('/');
  } catch (error) {
    console.log('Error in adding user controller', error);

    req.session.message = {
      type: 'danger',
      message: 'Error in adding user'
    };

    res.redirect('/');
    res.status(500).json({
      message:'internal server error'
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

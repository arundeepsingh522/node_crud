//App Entry file

//requiring modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const routes = require("./routes/routes");
const path = require('path');

const connectToDb = require("../src/db");
const User = require("../src/models/user");
const app = express();
const PORT = process.env.PORT || 5000;
//using middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//serving static files


console.log('current dir name ',__dirname);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'uploads')))
console.log('test',express.static(path.join(__dirname,'uploads')));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use("/", routes);
//set
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,'views'));
//
app.listen(PORT, async () => {
  console.log(`server is runnung at ${PORT}`);
  //connectToDb();
  try {
    const db = await mongoose.connect(process.env.DB_URI);
    console.log("Database is connected");
  } catch (error) {
    console.log("error in connecting db", error);
  }
});
console.log("all working fine!");

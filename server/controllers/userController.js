const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');
const generateToken = require('../utils/generateToken.js');
const bcrypt = require("bcryptjs");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const match = await bcrypt.compare(password, user.password)
    // const data = {id: user._id, name: user.name};
    if (user && match) {
      generateToken(res, user._id);
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (err) {
    res.status(err.statusCode || 500).json({err: err.message || "Internal server error"})
  }
};

const registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const userExists = await User.findOne({ email });
    
      if (userExists) {
        res.status(400);
        throw new Error('User already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      if (user) {
        generateToken(res, user._id);
    
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      } else {
        res.status(400);
        throw new Error('Invalid user data');
      }
    } catch (err) {
      res.status(err.statusCode || 500).json({err: err.message || "Internal server error"})
    }
  };

  const logoutUser = async(req, res) => {
    try{
      res.clearCookie("jwt", {sameSite: "none", secure: true}).status(200).send("User logged out successfully")
    }catch(err){
      res.status(500).json(err)
  }
  };

  module.exports =  {
    loginUser,
    registerUser,
    logoutUser,
  };
const express = require('express');
const {
  loginUser,
  registerUser,
  logoutUser,
} = require('../controllers/userController.js');
const User = require('../models/userModel.js');
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', loginUser);
router.get('/logout', logoutUser);
router.get("/auth/refetch", async(req, res) =>{
  try {
      const token = req.cookies.jwt
      jwt.verify(token, process.env.JWT_SECRET, {}, async(err, data) =>{
      if(err){
          return res.status(403).json(err)
      }
      const user = await User.findById(data.userId)
        const {password, ...info} = user._doc
      res.status(200).json(info)
  })
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router;
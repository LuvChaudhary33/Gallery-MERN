const express = require('express');
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");
const Post = require('../models/photoModel');
const protect = require('../middleware/authMiddleware.js');

router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const {title, description} = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);

    let post = await Post.create({
      title,
      description,
      photo: result.secure_url,
      username: req.user.name,
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({err})
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const posts = await Post.find({}).sort({createdAt: 'desc'});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Fetching posts failed, please try again' });
  }
});

router.get("/:id", protect,async(req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    let post = await Post.findById(postId);
    if(!post){
      throw new Error({success: false, message: 'Post does not exist, please try again' })
    }
    let alreadySeen = false;
    if(post.seen.includes(userId)){
      alreadySeen = true;
    }else{
      post = await Post.findByIdAndUpdate(postId,
        { "$push": { "seen": userId } },
        { "new": true, "upsert": true })
    }
    res.status(200).json({ success: true, alreadySeen, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Fetching post failed, please try again' });
  }
})

module.exports = router;
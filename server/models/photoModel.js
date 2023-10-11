const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description:{
        type: String,
        required: true,
    },
    photo:{
        type: String,
        required: true,
    },
    seen: [String],
},{
    timestamps: true,
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
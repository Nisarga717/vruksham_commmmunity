const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  likes: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

const PostSchema = new mongoose.Schema({
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [CommentSchema],
  createdAt: { type: Date, default: Date.now }, // Add this line
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;

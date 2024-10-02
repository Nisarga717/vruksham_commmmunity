const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Post = require('./models/post'); // Import the Post model

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (Replace with your MongoDB Atlas credentials)
mongoose.connect('mongodb+srv://kshitij:kshitij@vruksham.ldf59.mongodb.net/?retryWrites=true&w=majority&appName=vruksham', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// POST route to create a new post
app.post('/api/posts', async (req, res) => {
  try {
    const { content } = req.body;
    const newPost = new Post({ content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
});

// GET route to retrieve all posts
// GET route to fetch all posts from MongoDB
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });; // Fetch all posts from the 'posts' collection
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// POST route to increment likes for a post
app.post('/api/posts/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.likes += 1; // Increment the like count
    await post.save(); // Save the updated post to the database
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error liking post', error });
  }
});

import React, { useState, useEffect } from 'react';
import PostList from './Components/PostList';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  // Fetch posts from backend on component mount
  useEffect(() => {
    fetch('http://localhost:5000/api/posts')  // Your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);  // Set posts to the data from the API
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const addPost = (content) => {
    const newPost = { id: Date.now(), content, likes: 0, comments: [] };
    setPosts([newPost, ...posts]);
  };

  const postStory = (content) => {
    // Post data to backend
    fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })
      .then((response) => response.json())
      .then((newPost) => {
        // Add new post to the state
        setPosts([newPost, ...posts]);
      })
      .catch((error) => {
        console.error('Error posting story:', error);
      });
  };

  return (
    <div className="app">
      <h1>Community Stories</h1>
      <div className="post-form">
        <textarea id="postContent" placeholder="What's on your mind?" />
        <button onClick={() => postStory(document.getElementById('postContent').value)}>
          Post Story
        </button>
      </div>
      <PostList posts={posts} setPosts={setPosts} />
    </div>
  );
}

export default App;

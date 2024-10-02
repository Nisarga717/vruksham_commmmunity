import React, { useEffect, useState } from 'react';
import Post from './Post';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="post-list">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post key={post._id} post={post} setPosts={setPosts} />
        ))
      ) : (
        <p>No posts yet. Be the first to share your story!</p>
      )}
    </div>
  );
}

export default PostList;

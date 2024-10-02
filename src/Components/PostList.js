import React from 'react';
import Post from './Post';

function PostList({ posts, setPosts }) {
  const handleAddComment = async (postId, commentText) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: commentText }),
      });
      
      const updatedPost = await response.json();
      setPosts(prevPosts => prevPosts.map(post => post._id === postId ? updatedPost : post));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Sort posts by createdAt or similar timestamp field
  const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="post-list">
      {sortedPosts.map(post => (
        <Post
          key={post._id}
          post={post}
          setPosts={setPosts}
          onAddComment={handleAddComment}
        />
      ))}
    </div>
  );
}

export default PostList;

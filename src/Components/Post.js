import React, { useState } from 'react';
import CommentSection from './CommentSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function Post({ post, setPosts, onAddComment }) {
  const [liked, setLiked] = useState(post.likes > 0);

  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${post._id}/like`, {
        method: 'POST',
      });
      const updatedPost = await response.json();
      setPosts(prevPosts => prevPosts.map(p => p._id === post._id ? updatedPost : p));
      setLiked(!liked);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <p><strong>{post.content}</strong></p>
      </div>
      <div className="post-actions">
        <FontAwesomeIcon
          icon={faHeart}
          className={`heart-icon ${liked ? 'liked' : ''}`}
          onClick={handleLike}
        />{' '}
        ({post.likes})
      </div>
      <CommentSection
        comments={post.comments}
        postId={post._id}
        onAddComment={onAddComment}
        setPosts={setPosts}
      />
    </div>
  );
}

export default Post;

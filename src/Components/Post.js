import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import CommentSection from './CommentSection';

function Post({ post, setPosts }) {
  const [liked, setLiked] = useState(post.likes > 0);

  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${post._id}/like`, {
        method: 'POST',
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setPosts((prev) =>
          prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
        );
        setLiked(!liked);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="profile-pic"></div>
        <p><strong>{post.content}</strong></p>
      </div>
      <div className="post-actions">
        <FontAwesomeIcon
          icon={faHeart}
          className={`heart-icon2 ${liked ? 'liked' : ''}`}
          onClick={handleLike}
        />{' '}
        ({post.likes})
      </div>

      <CommentSection comments={post.comments} postId={post._id} setPosts={setPosts} />
    </div>
  );
}

export default Post;

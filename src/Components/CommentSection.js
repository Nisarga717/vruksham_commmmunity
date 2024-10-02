import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function CommentSection({ comments, postId, onAddComment, setPosts }) {
  const [commentText, setCommentText] = useState('');

  const handleCommentLike = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/comments/${commentId}/like`, {
        method: 'POST',
      });
      const updatedPost = await response.json();
      setPosts(prevPosts => prevPosts.map(post => post._id === postId ? updatedPost : post));
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  return (
    <div className="comment-section">
      <div className="comment-form">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="comment-input"
        />
        <button onClick={() => onAddComment(postId, commentText)} className="post-button">Post</button>
      </div>

      <div className="comments">
        {comments.map(comment => (
          <div key={comment._id} className="comment">
            <p className="comment-text">{comment.text}</p>
            <div className="comment-actions">
              <FontAwesomeIcon
                icon={faHeart}
                className={`heart-icon ${comment.liked ? 'liked' : ''}`}
                onClick={() => handleCommentLike(comment._id)}
              />{' '}
              <span className="like-count">({comment.likes})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;

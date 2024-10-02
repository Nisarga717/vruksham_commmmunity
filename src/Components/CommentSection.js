import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function CommentSection({ comments, postId, setPosts }) {
  const [commentText, setCommentText] = useState('');

  const handleAddComment = async () => {
    if (commentText.trim() !== '') {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${postId}/comment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: commentText }),
        });

        if (response.ok) {
          const updatedPost = await response.json();
          setPosts((prevPosts) =>
            prevPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
          );
          setCommentText('');
        }
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  const handleCommentLike = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/comment/${commentId}/like`, {
        method: 'POST',
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
        );
      }
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
        />
        <button onClick={handleAddComment}>Post</button>
      </div>

      <div className="comments">
        {comments.map(comment => (
          <div key={comment._id} className="comment">
            <p>{comment.text}</p>
            <div className="comment-actions">
              <FontAwesomeIcon
                icon={faHeart}
                className={`heart-icon2 ${comment.liked ? 'liked' : ''}`}
                onClick={() => handleCommentLike(comment._id)}
              />{' '}
              ({comment.likes})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;

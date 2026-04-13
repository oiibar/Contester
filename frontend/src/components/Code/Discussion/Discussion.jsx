import React from 'react';
import { useLocation } from 'react-router';
import MyButton from 'shared/ui/MyButton/MyButton';
import { formatDate } from 'shared/lib/dateUtils';
import { useDiscussions } from 'hooks/discussion/useDiscussions';
import './Discussion.scss';

const Discussion = () => {
  const location = useLocation();
  const contestData = location.state?.problem;

  const {
    discussions,
    newDiscussion,
    setNewDiscussion,
    replyMessages,
    handleReplyChange,
    handleReplySubmit,
    postDiscussion,
    discussionError,
    isLoading,
    error,
  } = useDiscussions(contestData);

  if (!contestData) return <p>No problem data available.</p>;

  return (
    <div className="discussions-section">
      <h2>Discussions</h2>

      <div className="discussion-form">
        <textarea
          value={newDiscussion}
          onChange={(e) => setNewDiscussion(e.target.value)}
          placeholder="Share your thoughts..."
        ></textarea>
        <MyButton onClick={postDiscussion}>Post Discussion</MyButton>
      </div>

      {isLoading ? (
        <p>Loading discussions...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="discussion-list">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="discussion-card">
              <div className="discussion-header">
                <h3>{discussion.username}</h3>
                <p>{formatDate(discussion.createdAt)}</p>
              </div>
              <p>{discussion.message}</p>

              <div className="reply-form">
                <textarea
                  value={replyMessages[discussion.id] || ''}
                  onChange={(e) =>
                    handleReplyChange(discussion.id, e.target.value)
                  }
                  placeholder="Write your reply..."
                ></textarea>
                <MyButton onClick={() => handleReplySubmit(discussion.id)}>
                  Post Reply
                </MyButton>
              </div>

              {discussion.replies.length > 0 && (
                <div className="replies-section">
                  {discussion.replies.map((reply) => (
                    <div key={reply.id} className="reply-card">
                      <div className="reply-header">
                        <h4>{reply.username}</h4>
                        <p>{formatDate(reply.createdAt)}</p>
                      </div>
                      <p>{reply.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Discussion;

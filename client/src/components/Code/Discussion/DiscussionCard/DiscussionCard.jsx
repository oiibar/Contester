import React from 'react';
import { formatDate } from 'shared/lib/dateUtils';
import ReplyForm from '../ReplyForm/ReplyForm';

const DiscussionCard = ({
  discussion,
  postReply,
  replyMessages,
  setReplyMessages,
}) => {
  return (
    <div key={discussion.id} className="discussion-card">
      <div className="discussion-header">
        <h3>{discussion.username}</h3>
        <p>{formatDate(discussion.createdAt)}</p>
      </div>
      <p>{discussion.message}</p>

      <ReplyForm
        discussionId={discussion.id}
        postReply={postReply}
        replyMessages={replyMessages}
        setReplyMessages={setReplyMessages}
      />

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
  );
};

export default DiscussionCard;

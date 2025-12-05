import React, { useState } from 'react';
import DiscussionCard from '../DiscussionCard/DiscussionCard';
import { replyToDiscussion } from 'shared/api/discussionApi';

const DiscussionList = ({ discussions, token, user }) => {
  const [replyMessages, setReplyMessages] = useState({});

  const postReply = async (discussionId, message) => {
    try {
      await replyToDiscussion(
        discussionId,
        {
          username: user.username,
          message,
        },
        token
      );
      setReplyMessages((prev) => ({ ...prev, [discussionId]: '' }));
    } catch (err) {
      console.error('Reply failed:', err);
    }
  };

  return (
    <div className="discussion-list">
      {discussions.map((discussion) => (
        <DiscussionCard
          key={discussion.id}
          discussion={discussion}
          postReply={postReply}
          replyMessages={replyMessages}
          setReplyMessages={setReplyMessages}
        />
      ))}
    </div>
  );
};

export default DiscussionList;

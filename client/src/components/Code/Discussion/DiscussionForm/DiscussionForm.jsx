import React, { useState } from 'react';
import MyButton from 'components/UI/MyButton/MyButton';

const DiscussionForm = ({ postDiscussion, discussionError }) => {
  const [newDiscussion, setNewDiscussion] = useState('');

  const handleDiscussionChange = (e) => {
    setNewDiscussion(e.target.value);
  };

  const handlePostDiscussion = () => {
    postDiscussion(newDiscussion);
    setNewDiscussion('');
  };

  return (
    <div className="discussion-form">
      <textarea
        value={newDiscussion}
        onChange={handleDiscussionChange}
        placeholder="Share your thoughts..."
        maxLength="255"
      />
      <MyButton onClick={() => handlePostDiscussion()}>
        Post Discussion
      </MyButton>
      {discussionError && <p className="error">{discussionError}</p>}
    </div>
  );
};

export default DiscussionForm;

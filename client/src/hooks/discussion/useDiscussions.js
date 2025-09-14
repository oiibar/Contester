import { useState, useEffect } from 'react';
import { useFetching } from 'hooks/fetching/useFetching';
import { addDiscussion, fetchDiscussions, replyToDiscussion } from 'api/api';
import { useAuth } from 'auth/AuthContext';

export const useDiscussions = (contestData) => {
  const { token, user } = useAuth();
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState('');
  const [replyMessages, setReplyMessages] = useState({});

  const {
    fetching: fetchDiscussionsData,
    isLoading,
    error,
  } = useFetching(async () => {
    if (contestData?.id) {
      const data = await fetchDiscussions(contestData.id, token);
      setDiscussions(data);
    }
  });

  const { fetching: postDiscussion, error: discussionError } = useFetching(
    async () => {
      if (contestData?.id && newDiscussion.trim()) {
        await addDiscussion(
          contestData.id,
          { username: user.username, message: newDiscussion },
          token,
          user.id
        );
        setNewDiscussion('');
        fetchDiscussionsData();
      }
    }
  );

  const handleReplySubmit = async (discussionId) => {
    const message = replyMessages[discussionId]?.trim();
    if (!message) return;

    try {
      await replyToDiscussion(
        discussionId,
        {
          username: user.username,
          message,
        },
        token
      );

      setReplyMessages((prev) => ({
        ...prev,
        [discussionId]: '',
      }));

      fetchDiscussionsData();
    } catch (err) {
      console.error('Reply failed:', err);
    }
  };
  const handleReplyChange = (discussionId, message) => {
    setReplyMessages((prev) => ({
      ...prev,
      [discussionId]: message,
    }));
  };

  useEffect(() => {
    fetchDiscussionsData();
  }, [contestData]);

  return {
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
  };
};

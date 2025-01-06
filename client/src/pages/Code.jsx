import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import "../styles/Code.css";
import MyButton from "../components/UI/MyButton/MyButton";
import { useFetching } from "../hooks/useFetching";
import { fetchDiscussions, addDiscussion, replyToDiscussion } from "../api/api";
import { useAuth } from "../hooks/AuthProvider";

const Code = () => {
  const location = useLocation();
  const {token, user} = useAuth();
  const username = user.username;
  const contestData = location.state?.problem;

  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [selectedDiscussionId, setSelectedDiscussionId] = useState(null);

  const { fetching: fetchDiscussionsData, isLoading, error } = useFetching(async () => {
    if (contestData?.id) {
      const data = await fetchDiscussions(contestData.id, token);
      setDiscussions(data);
    }
  });

  const { fetching: postDiscussion, error: discussionError } = useFetching(async () => {
    if (contestData?.id && newDiscussion.trim()) {
      await addDiscussion(contestData.id, { username, message: newDiscussion }, token);
      setNewDiscussion("");
      fetchDiscussionsData();  // Refresh the discussions after posting
    }
  });

  const { fetching: postReply, error: replyError } = useFetching(async () => {
    if (selectedDiscussionId && replyMessage.trim()) {
      await replyToDiscussion(selectedDiscussionId, { username, message: replyMessage }, token);
      setReplyMessage("");
      fetchDiscussionsData();  // Refresh discussions with the new reply
    }
  });

  useEffect(() => {
    fetchDiscussionsData();
  }, [contestData]);

  const handleReplyClick = (discussionId) => {
    setSelectedDiscussionId(discussionId);
  };

  const handlePostReply = () => {
    postReply();
  };

  if (!contestData) {
    return <p>No problem data available.</p>;
  }

  const toggleHint = (index) => {
    const hintContent = document.getElementById(`hint-content-${index}`);
    const button = document.getElementById(`hint-button-${index}`);

    if (hintContent.style.display === "block") {
      hintContent.style.display = "none";
      button.innerHTML = `Hint ${index + 1}`;
    } else {
      hintContent.style.display = "block";
      button.innerHTML = "Close Hint";
    }
  };

  return (
      <div className="contest-page">
        <div className="problem-section">
          <div className="problem-header">
            <h1>1. {contestData.title}</h1>
          </div>
          <div className="problem-description">
            <p>{contestData.given}</p>
            <h2>Examples:</h2>
            {contestData.examples?.map((example, index) => {
              const parsedExample = JSON.parse(example);
              return (
                  <div key={index}>
                    <pre>Input: {parsedExample.input}</pre>
                    <pre>Output: {parsedExample.output}</pre>
                  </div>
              );
            })}

            {/* Render dropdowns for hints */}
            {contestData.hint ? (
                <>
                  <h3 style={{ marginTop: "30px" }}>Hints:</h3>
                  {contestData.hints.map((hint, index) => (
                      <div key={index} className="hint-dropdown">
                        <button
                            id={`hint-button-${index}`}
                            className="hint-button"
                            onClick={() => toggleHint(index)}
                        >
                          Hint {index + 1}
                        </button>
                        <div
                            id={`hint-content-${index}`}
                            className="hint-content"
                            style={{ display: "none" }} // Initially hidden
                        >
                          <p>{hint}</p>
                        </div>
                      </div>
                  ))}
                </>
            ) : (
                <h3 style={{ marginTop: "30px" }}>No hints)</h3>
            )}
          </div>
        </div>

        {/* Discussion Section */}
        <div className="discussions-section">
          <h2>Discussions</h2>

          {/* Discussion Form */}
          <div className="discussion-form">
          <textarea
              value={newDiscussion}
              onChange={(e) => setNewDiscussion(e.target.value)}
              placeholder="Share your thoughts..."
          ></textarea>
            <MyButton onClick={postDiscussion}>Post Discussion</MyButton>
            {discussionError && <p className="error">{discussionError}</p>}
          </div>

          {/* Display Discussions */}
          {isLoading ? (
              <p>Loading discussions...</p>
          ) : error ? (
              <p className="error">Failed to load discussions.</p>
          ) : (
              <div className="discussion-list">
                {discussions.map((discussion) => (
                    <div key={discussion.id} className="discussion-card">
                      <div className="discussion-header">
                        <h3>{discussion.username}</h3>
                        <p>{discussion.createdAt}</p>
                      </div>
                      <p>{discussion.message}</p>
                      <div className="discussion-actions">
                        <MyButton onClick={() => handleReplyClick(discussion.id)}>Reply</MyButton>
                      </div>

                      {/* Replies */}
                      {discussion.replies.length > 0 && (
                          <div className="replies-section">
                            {discussion.replies.map((reply) => (
                                <div key={reply.id} className="reply-card">
                                  <div className="reply-header">
                                    <h4>{reply.username}</h4>
                                    <p>{reply.createdAt}</p>
                                  </div>
                                  <p>{reply.message}</p>
                                </div>
                            ))}
                          </div>
                      )}

                      {/* Reply Form */}
                      {selectedDiscussionId === discussion.id && (
                          <div className="reply-form">
                    <textarea
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        placeholder="Write your reply..."
                    ></textarea>
                            <MyButton onClick={handlePostReply}>Post Reply</MyButton>
                            {replyError && <p className="error">{replyError}</p>}
                          </div>
                      )}
                    </div>
                ))}
              </div>
          )}
        </div>

        {/* Code Editor Section */}
        <div className="editor-section">
          <div className="code-editor">
            <div className="header">
              <h2>Code Editor</h2>
              <MyButton>Run Code</MyButton>
            </div>
            <textarea
                placeholder="// Write your code here"
                className="code-area"
            ></textarea>
          </div>
          <div className="execution-section">
            <h3>Output:</h3>
            <pre className="output-box">Your output will appear here</pre>
          </div>
        </div>
      </div>
  );
};

export default Code;

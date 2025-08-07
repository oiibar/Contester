import React, { useState, useEffect } from "react";
import { useFetching } from "hooks/useFetching";
import { addDiscussion, fetchDiscussions, replyToDiscussion } from "api/api";
import { useAuth } from "hooks/auth/AuthProvider";
import MyButton from "components/UI/MyButton/MyButton";
import { formatDate } from "utils/dateUtils";
import { useLocation } from "react-router";
import "./Discussion.scss";

const Discussion = () => {
    const location = useLocation();
    const { token, user } = useAuth();
    const contestData = location.state?.problem;

    const [discussions, setDiscussions] = useState([]);
    const [newDiscussion, setNewDiscussion] = useState("");
    const [replyMessages, setReplyMessages] = useState({});

    const { fetching: fetchDiscussionsData, isLoading, error } = useFetching(async () => {
        if (contestData?.id) {
            const data = await fetchDiscussions(contestData.id, token);
            setDiscussions(data);
        }
    });

    const { fetching: postDiscussion, error: discussionError } = useFetching(async () => {
        if (contestData?.id && newDiscussion.trim()) {
            await addDiscussion(contestData.id, { username: user.username, message: newDiscussion }, token);
            setNewDiscussion("");
            fetchDiscussionsData();
        }
    });

    const { fetching: postReply, error: replyError } = useFetching(async () => {
        const currentDiscussionId = Object.keys(replyMessages).find(
            id => replyMessages[id].trim() !== ""
        );

        if (currentDiscussionId && replyMessages[currentDiscussionId].trim()) {
            await replyToDiscussion(currentDiscussionId, {
                username: user.username,
                message: replyMessages[currentDiscussionId]
            }, token);

            setReplyMessages(prev => ({
                ...prev,
                [currentDiscussionId]: ""
            }));

            fetchDiscussionsData();
        }
    });

    useEffect(() => {
        fetchDiscussionsData();
    }, [contestData]);

    const handleReplyChange = (discussionId, message) => {
        setReplyMessages(prev => ({
            ...prev,
            [discussionId]: message
        }));
    };

    const handleReplySubmit = async (discussionId) => {
        const message = replyMessages[discussionId]?.trim();
        if (!message) return;

        try {
            await replyToDiscussion(discussionId, {
                username: user.username,
                message
            }, token);

            setReplyMessages(prev => ({
                ...prev,
                [discussionId]: ""
            }));

            fetchDiscussionsData();
        } catch (err) {
            console.error("Reply failed:", err);
        }
    };


    if (!contestData) {
        return <p>No problem data available.</p>;
    }

    return (
        <div className="discussions-section">
            <h2>Discussions</h2>

            {/* POST INPUT */}
            <div className="discussion-form">
                <textarea
                    value={newDiscussion}
                    onChange={(e) => setNewDiscussion(e.target.value)}
                    placeholder="Share your thoughts..."
                ></textarea>
                <MyButton onClick={postDiscussion}>Post Discussion</MyButton>
                {discussionError && <p className="error">{discussionError}</p>}
            </div>

            {/* REPLIES */}
            {isLoading ? (
                <p>Loading discussions...</p>
            ) : error ? (
                <p className="error">Failed to load discussions.</p>
            ) : (
                <div className="discussion-list">
                    {discussions && discussions.map((discussion) => (
                        <div key={discussion.id} className="discussion-card">
                            <div className="discussion-header">
                                <h3>{discussion.username}</h3>
                                <p>{formatDate(discussion.createdAt)}</p>
                            </div>
                            <p>{discussion.message}</p>

                            {/* Reply Form */}
                            <div className="reply-form">
                                <textarea
                                    value={replyMessages[discussion.id] || ""}
                                    onChange={(e) => handleReplyChange(discussion.id, e.target.value)}
                                    placeholder="Write your reply..."
                                ></textarea>
                                <MyButton onClick={() => handleReplySubmit(discussion.id)}>
                                    Post Reply
                                </MyButton>
                                {replyError && <p className="error">{replyError}</p>}
                            </div>

                            {/* REPLIES */}
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
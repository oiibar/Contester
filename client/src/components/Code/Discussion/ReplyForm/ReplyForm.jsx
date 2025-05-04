import React from "react";
import MyButton from "components/UI/MyButton/MyButton";

const ReplyForm = ({ discussionId, postReply, replyMessages, setReplyMessages }) => {
    const handleReplyChange = (message) => {
        setReplyMessages(prev => ({
            ...prev,
            [discussionId]: message
        }));
    };

    const handleReplySubmit = () => {
        const message = replyMessages[discussionId]?.trim();
        if (!message) return;

        postReply(discussionId, message);
    };

    return (
        <div className="reply-form">
            <textarea
                value={replyMessages[discussionId] || ""}
                onChange={(e) => handleReplyChange(e.target.value)}
                placeholder="Write your reply..."
            />
            <MyButton onClick={() => handleReplySubmit()}>Post Reply</MyButton>
        </div>
    );
};

export default ReplyForm;

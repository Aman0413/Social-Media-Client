import React from "react";
import "./CommentOption.scss";

function CommentOption({
    closeCommentOption,
    comment,
    darkMode,
    handleDeleteComment,
}) {
    return (
        <div className={darkMode ? "CommentOption dark-mode" : "CommentOption"}>
            <div className="blank" onClick={closeCommentOption}></div>
            <div className="options">
                <div
                    className="option danger"
                    onClick={() => handleDeleteComment(comment._id)}
                >
                    Delete
                </div>
                <div className="option" onClick={closeCommentOption}>
                    Cancel
                </div>
            </div>
        </div>
    );
}

export default CommentOption;

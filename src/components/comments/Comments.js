import React, { useEffect, useRef, useState } from "react";
import Avatar from "../avatar/Avatar";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./Comments.scss";
import { likeAndUnlikePost } from "../../redux/slices/postsSlice";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { GoUnmute } from "react-icons/go";
import PostOptions from "../postOptions/PostOptions";
import { IoVolumeMuteSharp } from "react-icons/io5";
import {
  createComment,
  deleteComment,
  getComments,
} from "../../redux/slices/commentSlice";

import CommentOption from "./commentOption/CommentOption";

function Comments({ closeComments, post, darkMode, setOpenComments }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [openPostOptions, setOpenPostOptions] = useState(false);
  const [openCommentOption, setOpenCommentOption] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const comments = useSelector((state) => state.commentReducer.comments);
  const feedData = useSelector((state) => state.feedDataReducer.feedData);

  console.log(feedData);

  const filteredComments = comments.filter(
    (comment) => comment?.post === post._id
  );

  useEffect(() => {
    dispatch(
      getComments({
        postId: post._id,
      })
    );
  }, [dispatch, post._id, post.likesCount]);

  const handlePostLike = () => {
    dispatch(
      likeAndUnlikePost({
        postId: post._id,
      })
    );
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    dispatch(
      createComment({
        content,
        postId: `${post._id}`,
      })
    );
    setContent("");
    setTimeout(() => {
      dispatch(getComments({ postId: `${post._id}` }));
    }, 500);
  };

  const handleDeleteComment = (commentId) => {
    dispatch(
      deleteComment({
        data: {
          commentId,
        },
      })
    );
    setOpenCommentOption(false);
    setTimeout(() => {
      dispatch(getComments({ postId: `${post._id}` }));
    }, 500);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteUnmute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className={darkMode ? "Comments dark-mode" : "Comments"}>
      <div className="blank" onClick={closeComments}></div>
      <div className="comment-container">
        <div className="top-head">
          <div className="back" onClick={closeComments}>
            <BiArrowBack />
          </div>
          <div className="comment-heading">Comments</div>
          <div
            className="option"
            onClick={() => setOpenPostOptions(!openPostOptions)}
          >
            <BsThreeDots />
          </div>
        </div>
        {openPostOptions && (
          <PostOptions
            closePostOptions={() => setOpenPostOptions(false)}
            post={post}
          />
        )}
        <div className="close-icon" onClick={closeComments}>
          <RxCross2 />
        </div>
        <div className="image-section">
          {!post?.isVideo ? (
            <img src={post?.image?.url} alt="Post" />
          ) : (
            <video
              ref={videoRef}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              controls={false}
              onClick={handlePlayPause}
              style={{ objectFit: "contain" }}
              height={"100%"}
              width={"100%"}
              src={post?.image?.url}
            ></video>
          )}
          {post?.isVideo && (
            <button onClick={handleMuteUnmute}>
              {isMuted ? <IoVolumeMuteSharp /> : <GoUnmute />}
            </button>
          )}
        </div>
        <div className="comment-section">
          <div className="top">
            <div
              className="left"
              onClick={() => navigate(`/profile/${post.owner._id}`)}
            >
              <Avatar src={post.owner?.avatar?.url} />
              <h3 className="heading-name">{post?.owner?.name}</h3>
            </div>

            <div
              className="right"
              onClick={() => setOpenPostOptions(!openPostOptions)}
            >
              <BsThreeDots />
            </div>
            {openPostOptions && (
              <PostOptions
                closePostOptions={() => setOpenPostOptions(false)}
                post={post}
              />
            )}
          </div>
          <div className="comment-box">
            <div className="caption-container">
              <div className="avatar-name">
                <Avatar src={post.owner?.avatar?.url} />
                <h3
                  className="name"
                  onClick={() => navigate(`/profile/${post.owner._id}`)}
                >
                  {post?.owner?.name}
                </h3>
              </div>
              <p className="caption">{post.caption}</p>
            </div>
            <div className="comments">
              {filteredComments?.map((comment) => {
                return (
                  <div
                    className={
                      comment.user._id === feedData?._id
                        ? "my-comment"
                        : "user-comments"
                    }
                    key={comment._id}
                  >
                    <div className="name-content">
                      {" "}
                      <div
                        className="avatar-name"
                        onClick={() => {
                          navigate(`/profile/${comment.user._id}`);
                          setOpenComments(false);
                        }}
                      >
                        <Avatar src={comment?.user?.avatar?.url} />
                        <h3 className="name">{comment?.user?.name}</h3>
                      </div>
                      <p>{comment?.content}</p>
                    </div>

                    {comment.user._id === feedData?._id && (
                      <div
                        className="option-icon"
                        onClick={() => setOpenCommentOption(!openCommentOption)}
                      >
                        <HiOutlineDotsHorizontal />
                      </div>
                    )}
                    {openCommentOption && (
                      <CommentOption
                        handleDeleteComment={handleDeleteComment}
                        closeCommentOption={() => setOpenCommentOption(false)}
                        comment={comment}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="like-comment-time">
            <div className="like-comment">
              <div onClick={handlePostLike}>
                {post.isLiked ? (
                  <AiFillHeart className="like-icon liked-icon" />
                ) : (
                  <AiOutlineHeart className="like-icon" />
                )}
              </div>
              <label htmlFor="content">
                <div className="comment">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Comment"
                    className="_ab6-"
                    color="#262626"
                    fill="#262626"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path
                      d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </label>
            </div>
            <h3 className="likesCount">{`${post.likesCount} likes`}</h3>
            <h3 className="time"> {post?.timeAgo}</h3>
          </div>

          <div className="comment-input">
            <Avatar src={feedData?.avatar?.url} />
            <form onSubmit={handleSubmitComment}>
              <input
                type="text"
                placeholder="Add a comment..."
                value={content}
                id="content"
                name="comment-input"
                onChange={(e) => setContent(e.target.value)}
              />
              <button type="submit">Post</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;

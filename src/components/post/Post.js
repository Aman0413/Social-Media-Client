import React, { useState } from "react";
import Avatar from "../avatar/Avatar";
import "./Post.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { likeAndUnlikePost } from "../../redux/slices/postsSlice";
import { useNavigate } from "react-router";
import { showToast } from "../../redux/slices/appConfigSlice";
import { TOAST_SUCCESS } from "../../App";
import { BiMessageSquareDetail } from "react-icons/bi";
import Comments from "../comments/Comments";

function Post({ post }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openComments, setOpenComments] = useState(false);
  async function handlePostLiked() {
    dispatch(
      likeAndUnlikePost({
        postId: post._id,
      })
    );
  }

  return (
    <div className="Post">
      <div
        className="heading"
        onClick={() => navigate(`/profile/${post.owner._id}`)}
      >
        <Avatar src={post.owner?.avatar?.url} />
        <h4>{post.owner?.name}</h4>
      </div>
      <div className="content">
        <img src={post?.image?.url} alt="" />
      </div>
      <div className="footer">
        <div className="like-comment">
          <div className="like" onClick={handlePostLiked}>
            {post.isLiked ? (
              <AiFillHeart style={{ color: "red" }} className="icon" />
            ) : (
              <AiOutlineHeart className="icon" />
            )}
            <h4>{`${post.likesCount} likes`}</h4>

            {/* <BiMessageSquareDetail className="comment" /> */}
          </div>

          <div
            className="comment"
            onClick={() => setOpenComments(!openComments)}
          >
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
          {openComments && (
            <Comments
              closeComments={() => setOpenComments(false)}
              post={post}
              setOpenComments={setOpenComments}
            />
          )}
        </div>

        <p className="caption">{post.caption}</p>
        <h6 className="time-ago">{post?.timeAgo}</h6>
      </div>
    </div>
  );
}

export default Post;

import React, { useEffect, useState } from "react";
import Avatar from "../avatar/Avatar";
import "./Post.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likeAndUnlikePost } from "../../redux/slices/postsSlice";
import { useNavigate } from "react-router";
import Comments from "../comments/Comments";

function Post({ post }) {
  const [popup, setPopUp] = useState(false);
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

  function handleThreeDot() {
    setPopUp(true);
  }
  async function postDelete(post_id) {
    dispatch(
      deletePost({
        postId: post_id,
      })
    );
  }
  useEffect(() => {}, []);

  return (
    <div className="Post">
      <div
        className="heading"
        onClick={() => navigate(`/profile/${post.owner._id}`)}
      >
        <div className="flex">
          <Avatar src={post.owner?.avatar?.url} />
          <h4>{post.owner?.name}</h4>
        </div>

        <div>
          <BsThreeDotsVertical
            onClick={() => {
              handleThreeDot();
            }}
            className="logo"
          />
          {popup ? (
            <div className="popup">
              <RxCross2
                onClick={() => {
                  setPopUp(false);
                }}
                className="logo"
              />
              <p
                className="logo"
                onClick={() => {
                  postDelete(post._id);
                }}
              >
                Delete Post
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
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

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followAndUnfollowUser } from "../../redux/slices/feedSlice";
import { deletePost } from "../../redux/slices/postsSlice";
import "./PostOptions.scss";

function PostOptions({ closePostOptions, post, darkMode }) {
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const feedData = useSelector((state) => state.feedDataReducer.feedData);
  const [isFollowing, setIsFollowing] = useState();
  const dispatch = useDispatch();
  const currentUserId = myProfile?._id;

  useEffect(() => {
    setIsFollowing(
      feedData?.followings?.find((item) => item._id === post?.owner?._id)
    );
  }, [feedData, post, dispatch]);

  const handleFollowUser = () => {
    dispatch(
      followAndUnfollowUser({
        userIdToFollow: post?.owner?._id,
      })
    );
    closePostOptions(false);
  };

  const handleDeletePost = () => {
    dispatch(
      deletePost({
        data: { postId: post._id },
      })
    );
    closePostOptions(false);
    window.location.reload();
  };

  return (
    <div className={darkMode ? "PostOptions dark-mode" : "PostOptions"}>
      <div className="blank" onClick={closePostOptions}></div>
      <div className="option-container">
        {currentUserId === post?.owner?._id && (
          <div className="option danger" onClick={handleDeletePost}>
            Delete
          </div>
        )}
        {currentUserId !== post?.owner?._id && (
          <div
            onClick={handleFollowUser}
            className={isFollowing ? "option danger" : "option follow"}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </div>
        )}
        <div className="option" onClick={closePostOptions}>
          Cancel
        </div>
      </div>
    </div>
  );
}

export default PostOptions;

import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import "./Profile.scss";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/slices/postsSlice";
import { followAndUnfollowUser } from "../../redux/slices/feedSlice";

function Profile() {
  const navigate = useNavigate();
  const params = useParams();
  const userProfile = useSelector((state) => state.postsReducer.userProfile);
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const feedData = useSelector((state) => state.feedDataReducer.feedData);
  const dispatch = useDispatch();
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    dispatch(
      getUserProfile({
        userId: params.userId,
      })
    );
    setIsMyProfile(myProfile?._id === params.userId);
    setIsFollowing(
      feedData?.followings?.find((item) => item._id === params.userId)
    );
  }, [myProfile, params.userId, feedData, dispatch]);

  function handleUserFollow() {
    dispatch(
      followAndUnfollowUser({
        userIdToFollow: params.userId,
      })
    );
  }

  return (
    <div className="Profile">
      <div className="container">
        <div className="left-part">
          {isMyProfile}
          {userProfile?.posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
        <div className="right-part">
          <div className="profile-card">
            <div className="profile-container">
              <div className="my-profile-left">
                <img
                  className="user-img"
                  src={userProfile?.avatar?.url}
                  alt=""
                />
              </div>
              <div className="my-profile-right">
                <div className="my-profil-right-container">
                  <h3 className="user-name">{userProfile?.name}</h3>
                  {!isMyProfile && (
                    <>
                      <span>
                        <h4
                          style={{ marginTop: "10px" }}
                          onClick={handleUserFollow}
                          className={
                            isFollowing
                              ? "hover-link follow-link"
                              : "btn-primary"
                          }
                        >
                          {isFollowing ? "Unfollow" : "Follow"}
                        </h4>
                      </span>
                    </>
                  )}
                  {isMyProfile && (
                    <span>
                      <button
                        className="update-profile btn-secondary"
                        onClick={() => {
                          navigate("/updateProfile");
                        }}
                      >
                        Update Profile
                      </button>
                    </span>
                  )}
                </div>

                <div className="follower-info">
                  <div className="flex">
                    <h4>{`${userProfile?.posts?.length} `}</h4>
                    <p className="bold">Posts</p>
                  </div>
                  <div className="flex">
                    <h4>{`${userProfile?.followers?.length} `}</h4>
                    <p className="bold">Followers</p>
                  </div>
                  <div className="flex">
                    <h4>{`${userProfile?.followings?.length} `}</h4>
                    <p className="bold">Followings</p>
                  </div>
                </div>
                <div className="bio-container">
                  <p className="bio">{userProfile?.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

import React, { useEffect, useState } from "react";
import "./UpdateProfile.scss";
import "./UpdateProfile.scss";
import dummyUserImg from "../../assets/user.png";
import { useSelector, useDispatch } from "react-redux";
import { updateMyProfile } from "../../redux/slices/appConfigSlice";
import { axiosClient } from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";
import toast, { Toaster } from "react-hot-toast";

function UpdateProfile() {
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userImg, setUserImg] = useState("");
  const dispatch = useDispatch();
  const [deletePopUp, setdeletePopUp] = useState(false);
  const navigate = useNavigate();
  const sucessToast = (msg) => {
    toast.success(msg);
  };
  const errorToast = (msg) => {
    toast.error(msg);
  };
  useEffect(() => {
    setName(myProfile?.name || "");
    setBio(myProfile?.bio || "");
    setUserImg(myProfile?.avatar?.url);
  }, [myProfile]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setUserImg(fileReader.result);
        console.log("img data", fileReader.result);
      }
    };
  }

  function hadlePopUp() {
    if (deletePopUp) {
      setdeletePopUp(false);
    } else {
      setdeletePopUp(true);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      updateMyProfile({
        name,
        bio,
        userImg,
      })
    );
  }

  async function deleteUser() {
    const res = await axiosClient.delete("/user/", {});

    if (res.status === "ok") {
      sucessToast("User Deleted");
    } else {
      errorToast(res.result);
    }
  }

  return (
    <div className="UpdateProfile">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="container">
        <div className="left-part">
          <div className="input-user-img">
            <label htmlFor="inputImg" className="labelImg">
              <img src={userImg ? userImg : dummyUserImg} alt={name} />
            </label>
            <input
              className="inputImg"
              id="inputImg"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="right-part">
          {deletePopUp ? (
            <div className="delete-account-pop">
              <h4>Are sure delete account ? </h4>
              <div className="response">
                <button className="btn-primary" onClick={deleteUser}>
                  Yes
                </button>
                <button
                  className="btn-primary"
                  onClick={() => {
                    setdeletePopUp(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
          <form onSubmit={handleSubmit}>
            <input
              value={name}
              type="text"
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              rows="10"
              cols="3"
              value={bio}
              type="text"
              placeholder="Your Bio"
              onChange={(e) => setBio(e.target.value)}
            />

            <button className="btn-primary" type="submit">
              Update
            </button>
          </form>

          <button className="delete-account btn-primary" onClick={hadlePopUp}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;

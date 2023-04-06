import React, { useState } from "react";
import "./Footer.scss";
import { IoSearchSharp } from "react-icons/io5";
import { GrNotification } from "react-icons/gr";
import { RiUserFollowLine } from "react-icons/ri";
import { FiPlusSquare } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import CreatePost from "../createPost/CreatePost";
import { RxCross2 } from "react-icons/rx";
import { axiosClient } from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";

function Footer() {
  const [post, setPost] = useState(false);
  const [search, setSearchPopUp] = useState(false);
  const [searchName, setSearchName] = useState("");
  const navigate = useNavigate();

  function handlePostPopUp() {
    if (post === true) {
      setPost(false);
    } else {
      setPost(true);
    }
  }
  function handleSearchPopUp() {
    if (search === true) {
      setSearchPopUp(false);
    } else {
      setSearchPopUp(true);
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    const user = await axiosClient.get("/user/findUserName", {
      userName: searchName,
    });

    console.log(user);
  }

  return (
    <div className="Footer">
      <div className="container footer-container">
        {post ? (
          <div className="top">
            <div className="post">
              <div className="create-post">
                <CreatePost />
              </div>
              <div
                className="cancel-logo"
                onClick={() => {
                  setPost(false);
                }}
              >
                <div className="flex-end">
                  <RxCross2 className="logo" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {search ? (
          <div className="top">
            <div className="post">
              <div className="create-post">
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    onChange={(e) => {
                      setSearchName(e.target.value);
                    }}
                  />
                  <button>Submit</button>
                </form>
              </div>
              <div
                className="cancel-logo"
                onClick={() => {
                  setSearchPopUp(false);
                }}
              >
                <div className="flex-end">
                  <RxCross2 className="logo" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="bottom">
          <ul className="footer-logo-container">
            <li
              onClick={() => {
                navigate("/");
              }}
            >
              <AiFillHome className="logo" />
            </li>
            <li onClick={handleSearchPopUp}>
              <IoSearchSharp className="logo" />
            </li>
            <li onClick={handlePostPopUp}>
              <FiPlusSquare className="logo" />
            </li>
            <li>
              <GrNotification className="logo" />
            </li>
            <li
              onClick={() => {
                navigate("/updateProfile");
              }}
            >
              <RiUserFollowLine className="logo" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;

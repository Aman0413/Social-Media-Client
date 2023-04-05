import React, { useState } from "react";
import "./Footer.scss";
import { IoSearchSharp } from "react-icons/io5";
import { GrNotification } from "react-icons/gr";
import { RiUserFollowLine } from "react-icons/ri";
import { FiPlusSquare } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import CreatePost from "../createPost/CreatePost";
import { RxCross2 } from "react-icons/rx";

function Footer() {
  const [post, setPost] = useState(false);

  function handlePost() {
    if (post === true) {
      setPost(false);
    } else {
      setPost(true);
    }
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
        <div className="bottom">
          <ul className="footer-logo-container">
            <li>
              <AiFillHome />
            </li>
            <li>
              <IoSearchSharp />
            </li>
            <li onClick={handlePost}>
              <FiPlusSquare />
            </li>
            <li>
              <GrNotification />
            </li>
            <li>
              <RiUserFollowLine />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;

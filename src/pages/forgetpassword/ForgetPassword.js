import React, { useState } from "react";
import "./ForgetPassword.scss";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const sucessToast = (msg) => {
    toast.success(msg);
  };
  const errorToast = (msg) => {
    toast.error(msg);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await axiosClient.post("/auth/forgetpassword", {
      email,
      password,
      confirmPassword,
    });

    if (res.status === "ok") {
      sucessToast(res.result);

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      errorToast(res.result);
    }
  }
  return (
    <div className="ForgetPassword">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="main">
        <p class="sign" align="center">
          Forget Password
        </p>
        <form className="form1" onSubmit={handleSubmit}>
          <input
            class="un "
            type="text"
            align="center"
            placeholder="Email"
            id="Email"
            autoComplete="off"
            autoCorrect="off"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            class="un "
            type="password"
            align="center"
            placeholder="Password"
            autoComplete="off"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            class="pass"
            type="text"
            align="center"
            placeholder="Confirm Password"
            autoComplete="off"
            id="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="flex">
            <button className="submit" align="center">
              Submit
            </button>
          </div>
          <p class="account" align="center">
            Already have an account ?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span className="dark">Login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;

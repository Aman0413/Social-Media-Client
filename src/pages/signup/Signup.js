import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import "./Signup.scss";
import toast, { Toaster } from "react-hot-toast";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const sucessToast = (msg) => {
    toast.success(msg);
  };
  const errorToast = (msg) => {
    toast.error(msg);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await axiosClient.post("/auth/signup", {
        name,
        email,
        password,
      });

      if (result.status === "ok") {
        sucessToast("User Registered");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="Signup">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="main">
        <p class="sign" align="center">
          Sign up
        </p>
        <form className="form1" onSubmit={handleSubmit}>
          <input
            class="un "
            type="text"
            align="center"
            placeholder="Name"
            id="name"
            autoComplete="off"
            autoCorrect="off"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            class="un "
            type="text"
            align="center"
            placeholder="Email"
            autoComplete="off"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            class="pass"
            type="password"
            align="center"
            placeholder="Password"
            autoComplete="off"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex">
            <button className="submit" align="center">
              Sign up
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

export default Signup;

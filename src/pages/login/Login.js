import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorageManager";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/auth/login", {
        email,
        password,
      });

      setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="Login">
      <div className="main">
        <p class="sign" align="center">
          Login
        </p>
        <form className="form1" onSubmit={handleSubmit}>
          <input
            class="un "
            type="text"
            align="center"
            placeholder="Email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            class="pass"
            type="password"
            align="center"
            placeholder="Password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>
            <Link to={"/forgetpassword"} className="forget-password">
              Forget Password ?
            </Link>
          </p>
          <div className="flex">
            <button className="submit" align="center">
              Login
            </button>
          </div>
          <p class="account" align="center">
            Do not have an account ?{" "}
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <span className="dark">Sign Up</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

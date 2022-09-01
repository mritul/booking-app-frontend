import React, { useState } from "react";
import HelperMessage from "../../components/universal/HelperMessage/HelperMessage";
import { Link } from "react-router-dom";
import "./Login.css";
const Login = () => {
  // useState hooks for handling input fields
  //Login form
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //useState hook to show helper message if the entered username or password are incorrect in the login process
  // const [incorrectLoginCredentials, setIncorrectLoginCredentials] =
  //   useState(false);

  // Handling Input fields
  const handleUsernameInput = (e) => {
    setLoginUsername(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setLoginPassword(e.target.value);
  };

  // Handling form submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="Login">
      <form id="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          required
          placeholder="Enter your username"
          value={loginUsername}
          onChange={handleUsernameInput}
        />
        <input
          type="password"
          required
          placeholder="Enter your password"
          value={loginPassword}
          onChange={handlePasswordInput}
        />
        <button className="btn login-submit-btn">Login</button>
        {/* {incorrectLoginCredentials && (
          <HelperMessage messageContent="Incorrect username or password" />
        )} */}
        <p className="helper-msg">
          Don't have an account ?{" "}
          <Link to="/register" className="link-text">
            <span>Create one</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

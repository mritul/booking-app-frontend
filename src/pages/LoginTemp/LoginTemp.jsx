import React, { useState } from "react";
// import HelperMessage from "../../components/universal/HelperMessage/HelperMessage";
import { Link } from "react-router-dom";
import "./LoginTemp.css";
const Login = () => {
  // useState hooks for handling input fields
  //Login form
  const [loginEmail, setLoginEmail] = useState("");

  //useState hook to show helper message if the entered username or password are incorrect in the login process
  // const [incorrectLoginCredentials, setIncorrectLoginCredentials] =
  //   useState(false);

  // Handling Input fields
  const handleEmailInput = (e) => {
    setLoginEmail(e.target.value);
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
          type="email"
          required
          placeholder="Enter your email"
          value={loginEmail}
          onChange={handleEmailInput}
        />
        <button className="btn login-submit-btn">Send OTP</button>
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

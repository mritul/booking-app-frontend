import React, { useState } from "react";
import { Link } from "react-router-dom";
import HelperMessage from "../../components/universal/HelperMessage/HelperMessage";
import "./Register.css";

const Register = () => {
  // const navigate = useNavigate();

  //useState hooks for handling input fields
  // Registration form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  //useState hook to show helper message if username is already taken in the registration process
  const [usernameTaken, setUsernameTaken] = useState(false);

  // Functions to handle input fields
  const handleFirstNameInput = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameInput = (e) => {
    setLastName(e.target.value);
  };
  const handleRegisterUsernameInput = (e) => {
    //Not letting the user enter a username with space in it
    // To achieve this we see if the last character of the e.target.value is a space
    if (e.target.value[e.target.value.length - 1] !== " ") {
      setRegisterUsername(e.target.value);
    }
  };
  const handleRegisterPasswordInput = (e) => {
    setRegisterPassword(e.target.value);
  };

  //Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setUsernameTaken(true);
    // Since we use preventDefault, the form action won't be executed and hence we perform the post request through axios
  };
  return (
    <div className="Register">
      <div className="card-left">
        <h1>Register</h1>
        <form id="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First name:</label>
            <input
              required
              type="text"
              value={firstName}
              onChange={handleFirstNameInput}
            />
          </div>
          <div className="form-group">
            <label>Last name:</label>
            <input
              type="text"
              value={lastName}
              onChange={handleLastNameInput}
            />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input
              required
              type="text"
              minLength={5}
              name="username"
              value={registerUsername}
              onChange={handleRegisterUsernameInput}
              pattern="[a-z0-9]+"
              title="Username should be lowercase alphanumeric"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              required
              type="password"
              minLength={6}
              name="password"
              value={registerPassword}
              onChange={handleRegisterPasswordInput}
            />
          </div>
          <button className="btn register-submit-btn" onSubmit={handleSubmit}>
            Register
          </button>
          <p className="helper-msg">
            Already have an account ?{" "}
            <Link to="/login" className="link-text">
              <span>Login</span>
            </Link>
          </p>
          {usernameTaken && (
            <HelperMessage messageContent="That username is already taken" />
          )}
        </form>
      </div>
      <div className="card-right">
        <img
          src="assets/register-svg.svg"
          alt="Register illustration"
          id="register-svg"
        />
      </div>
    </div>
  );
};

export default Register;

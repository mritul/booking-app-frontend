import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import HelperMessage from "../../components/universal/HelperMessage/HelperMessage";
import "./RegisterTemp.css";

const Register = () => {
  const navigate = useNavigate();

  //useState hooks for handling input fields
  // Registration form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");

  // Functions to handle input fields
  const handleFirstNameInput = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameInput = (e) => {
    setLastName(e.target.value);
  };
  const handleRegisterEmailInput = (e) => {
    //Not letting the user enter a username with space in it
    // To achieve this we see if the last character of the e.target.value is a space
    if (e.target.value[e.target.value.length - 1] !== " ") {
      setRegisterEmail(e.target.value);
    }
  };
  const handleRegisterPhoneInput = (e) => {
    setRegisterPhone(e.target.value);
  };

  //Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
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
            <label>Email:</label>
            <input
              required
              type="email"
              name="email"
              value={registerEmail}
              onChange={handleRegisterEmailInput}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              required
              type="tel"
              pattern="[0-9]{10}"
              name="phone"
              value={registerPhone}
              onChange={handleRegisterPhoneInput}
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
        </form>
      </div>
    </div>
  );
};

export default Register;

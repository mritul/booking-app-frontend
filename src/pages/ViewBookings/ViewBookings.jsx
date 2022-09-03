import axios from "axios";
import React, { useState } from "react";
import Bookings from "../../components/ViewBookings/Bookings/Bookings";
import "./ViewBookings.css";
const Login = () => {
  //Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [bookings, setBookings] = useState([]);

  // Handling Input fields
  const handleEmailInput = (e) => {
    setLoginEmail(e.target.value);
  };

  // Handling form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/api/bookings/${loginEmail}`,
    });
    const data = await response.data;
    console.log(data);
    setBookings(data.bookings);
    setLoginEmail("");
  };
  return (
    <div className="ViewBookings">
      <form id="view-bookings-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={loginEmail}
          onChange={handleEmailInput}
        />
        <button className="btn view-bookings-submit-btn">Check Bookings</button>
      </form>
      {bookings ? (
        <Bookings bookings={bookings} />
      ) : (
        <>No bookings associated</>
      )}
    </div>
  );
};

export default Login;

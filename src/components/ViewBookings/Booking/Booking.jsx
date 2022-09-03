import React from "react";
import "./Booking.css";
const Booking = ({
  id,
  experience,
  variant,
  city,
  date,
  time,
  pax,
  amount,
}) => {
  // Processing date object by formatting
  const bookingDate = date;
  return (
    <div className="Booking">
      <h1 className="booking-id">Booking Id : {id}</h1>
      <div className="heading">
        <h1 className="experience">{experience}</h1>
        <h3>{variant}</h3>
        <h3>{city}</h3>
      </div>
      <div className="details">
        <p>Date: {date}</p>
        <p>Time: {time}</p>
        <p>Adults: {pax.adults}</p>
        <p>Children: {pax.children}</p>
        <p>Infants: {pax.infants}</p>
      </div>
      <h1>
        <i className="fa-solid fa-indian-rupee-sign"></i>
        {amount}
      </h1>
    </div>
  );
};

export default Booking;

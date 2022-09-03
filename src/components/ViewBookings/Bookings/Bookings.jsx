import React from "react";
import "./Bookings.css";
import Booking from "../Booking/Booking";

const Bookings = ({ bookings }) => {
  console.log(bookings);
  return (
    <div className="Bookings">
      {bookings.map((booking) => (
        <Booking
          id={booking.id}
          experience={booking.experience}
          variant={booking.variant}
          city={booking.city}
          date={booking.date}
          time={booking.time}
          pax={booking.pax}
          amount={booking.amount}
        />
      ))}
      {/* <Booking /> */}
    </div>
  );
};

export default Bookings;

import React from "react";
import "./Guests.css";
import { HashLink } from "react-router-hash-link";
const Guests = ({
  adults,
  setAdults,
  children,
  setChildren,
  infants,
  setInfants,
  experienceId,
  filteredVariant,
}) => {
  // Functions for the guests count modification
  const handlePlusClickAdults = () => {
    setAdults(adults + 1);
  };
  const handleMinusClickAdults = () => {
    if (adults > 0) {
      setAdults(adults - 1);
    }
  };
  const handlePlusClickChildren = () => {
    setChildren(children + 1);
  };
  const handleMinusClickChildren = () => {
    if (children > 0) {
      setChildren(children - 1);
    }
  };
  const handlePlusClickInfants = () => {
    setInfants(infants + 1);
  };
  const handleMinusClickInfants = () => {
    if (infants > 0) {
      setInfants(infants - 1);
    }
  };
  return (
    <div id="Guests">
      <h1 className="title">Guests</h1>
      <div className="guests-container">
        <div className="guest">
          <div className="text">
            <h1>Adult</h1>
            <p>Above 19 yrs</p>
          </div>
          <div className="counter">
            <button className="btn-minus" onClick={handleMinusClickAdults}>
              -
            </button>
            <h1 className="count">{adults}</h1>
            <button className="btn-plus" onClick={handlePlusClickAdults}>
              +
            </button>
          </div>
          <div className="price">
            <h1>
              <i className="fa-solid fa-indian-rupee-sign"></i>
              {adults * filteredVariant[0].price.adult}
            </h1>
          </div>
        </div>
        <div className="guest">
          <div className="text">
            <h1>Children</h1>
            <p>6 to 18 yrs</p>
          </div>
          <div className="counter">
            <button className="btn-minus" onClick={handleMinusClickChildren}>
              -
            </button>
            <h1 className="count">{children}</h1>
            <button className="btn-plus" onClick={handlePlusClickChildren}>
              +
            </button>
          </div>
          <div className="price">
            <h1>
              <i className="fa-solid fa-indian-rupee-sign"></i>
              {children * filteredVariant[0].price.children}
            </h1>
          </div>
        </div>
        <div className="guest">
          <div className="text">
            <h1>Infants</h1>
            <p>Under 5 yrs</p>
          </div>
          <div className="counter">
            <button className="btn-minus" onClick={handleMinusClickInfants}>
              -
            </button>
            <h1 className="count">{infants}</h1>
            <button className="btn-plus" onClick={handlePlusClickInfants}>
              +
            </button>
          </div>
          <div className="price">
            <h1>
              <i className="fa-solid fa-indian-rupee-sign"></i>
              {infants * filteredVariant[0].price.infants}
            </h1>
          </div>
        </div>
      </div>
      {adults + children + infants > 0 ? (
        <HashLink to={`/book/${experienceId}/#details-card`} className="guide">
          View Summary
        </HashLink>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Guests;

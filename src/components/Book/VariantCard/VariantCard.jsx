import "./VariantCard.css";
import { HashLink } from "react-router-hash-link";
import { useEffect, useState } from "react";
const VariantCard = ({
  variantTitle,
  startsAt,
  highlights,
  basePrice,
  duration,
  variantId,
  selectedVariant,
  setSelectedVariant,
  setFilteredVariant,
  variants,
  experienceId,
  availableTimeSlots,
  price,
  unavailableDates,
  date,
}) => {
  //useEffect hooks
  // 1. Whenever a selection is made, the selectedVariant state changes, hence that is added to dependency so that filteredVariant is immediately assigned that variant as well
  useEffect(() => {
    // Filtering the variant chosen out of all variants using the variantId
    setFilteredVariant(
      variants.filter((variant) => selectedVariant === variant._id)
    );
  }, [selectedVariant]);

  // Function to select a variant and assign its id to prop passed from Book
  const makeSelection = () => {
    setSelectedVariant(variantId);
  };

  // Function to select a variant and assign null to prop passed from Book
  const makeUnselection = () => {
    setSelectedVariant(null);
    setFilteredVariant([]);
  };

  // The below piece of code is for dynamically setting the notAvailable for controlling the select buttons
  // useEffect is used because everytime date (chosen by the user) changes we need to control the notAvailable state as well that decides the state of the select button
  const [notAvailable, setNotAvailable] = useState(null);

  useEffect(() => {
    const dateChosenString = `${date.getDate()} ${date.getMonth()}`;
    // Making an array of unavailable dates in the form of just dd mm strings and not the whole UTC String
    const unavailableDatesArray = [];
    unavailableDates.forEach((date) => {
      const tempDate = new Date(date);
      unavailableDatesArray.push(
        `${tempDate.getDate()} ${tempDate.getMonth()}`
      );
    });
    setNotAvailable(unavailableDatesArray.includes(dateChosenString));
  }, [date]);

  return (
    <div className="VariantCard">
      <h1 className="variant-title">{variantTitle}</h1>
      <p className="variant-info">
        <i className="fa-solid fa-clock"></i> Starts At: {startsAt}
      </p>
      <p className="variant-info">
        <i className="fa-solid fa-hourglass"></i> Duration: {duration}
      </p>
      <p className="pricing">
        from
        <span>
          <i className="fa-solid fa-indian-rupee-sign"></i>
          {basePrice}
        </span>
      </p>

      {/* Conditionally rendering the three buttons by also making sure that one card goes back to select if other card is selected using certain conditions */}
      {notAvailable === false && selectedVariant !== variantId ? (
        <HashLink to={`/book/${experienceId}/#time-selection`}>
          <button className="select-btn" onClick={makeSelection}>
            Select
          </button>
        </HashLink>
      ) : notAvailable === false && selectedVariant === variantId ? (
        <HashLink to={`/book/${experienceId}/#time-selection`}>
          <button className="selected-btn" onClick={makeUnselection}>
            <i className="fa-solid fa-check"></i>Selected
          </button>
        </HashLink>
      ) : (
        <HashLink to={`/book/${experienceId}/#time-selection`}>
          <button className="not-available-btn">Not Available</button>
        </HashLink>
      )}
      <div className="highlights">
        {highlights.map((highlight) => (
          <li className="highlight">{highlight}</li>
        ))}
      </div>
    </div>
  );
};

export default VariantCard;

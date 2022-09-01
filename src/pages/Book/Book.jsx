import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import VariantCard from "../../components/Book/VariantCard/VariantCard";
import Guests from "../../components/Book/Guests/Guests";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Book.css";
import { HashLink } from "react-router-hash-link";
import axios from "axios";

export const Book = () => {
  //useState hooks
  const experienceId = useParams().experienceId;
  // selectedVariant state is passed as a prop instead of creating the state inside variantCard because the variantId is different for each variant so only one variantId should be stored on selection
  const [selectedVariant, setSelectedVariant] = useState(null);
  // State for storing date via DatePicker
  const [date, setDate] = useState(new Date());
  // State to store time picked by user
  const [time, setTime] = useState(null);
  // State to store variants fetched
  const [variants, setVariants] = useState([]);
  // State to store just the selected variant (as an object [note that selectedVariant stores the id])
  const [filteredVariant, setFilteredVariant] = useState([]);
  // Maintaining a separate variable for a date object to add days to. This is because Datepicker needs to be set a max date that can be selected (70 in this case)
  let d = new Date();
  d.setDate(d.getDate() + 70);

  //useEffect
  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/api/variants?experienceId=${experienceId}`,
    })
      .then((res) => {
        setVariants(res.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  // For the counter for guests
  //States
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  // Functions

  const handleChange = (e) => {
    setTime(e.target.value);
  };

  return (
    <section className="Book">
      <h1 className="title">Select a date</h1>
      <div className="calendar">
        <DatePicker
          selected={date}
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          maxDate={d}
          onChange={(date) => setDate(date)}
          className="date-picker"
        />
      </div>
      <h1 className="title">Select your preference</h1>
      <div className="variants">
        {variants.map((variant) => (
          <VariantCard
            variantTitle={variant.displayName}
            startsAt={variant.startingTime}
            duration={variant.duration}
            basePrice={variant.startingPrice}
            highlights={variant.highlights}
            variantId={variant._id}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            variants={variants}
            setFilteredVariant={setFilteredVariant}
            experienceId={experienceId}
            unavailableDates={variant.unavailableDates}
            price={variant.price}
            availableTimeSlots={variant.availableTimeSlots}
            date={date}
          />
        ))}
      </div>
      {/* If any variant is selected, filteredVariant contains one element and hence
      time-selection appears */}
      {filteredVariant.length > 0 ? (
        <div id="time-selection">
          <div className="selection-container">
            <h1 className="title">Select time preference</h1>
            <select onChange={handleChange} defaultValue="">
              <option disabled value="">
                Select
              </option>
              {filteredVariant[0].availableTimeSlots.map((slot) => (
                <option value={slot}>{slot}</option>
              ))}
            </select>
          </div>
          {time && (
            <HashLink to={`/book/${experienceId}/#Guests`} className="guide">
              Choose number of guests
            </HashLink>
          )}
        </div>
      ) : (
        <></>
      )}
      {time && (
        <Guests
          adults={adults}
          setAdults={setAdults}
          children={children}
          setChildren={setChildren}
          infants={infants}
          setInfants={setInfants}
          experienceId={experienceId}
          filteredVariant={filteredVariant}
        />
      )}

      {adults + children + infants > 0 ? (
        <div id="details-card">
          <div className="text">
            <h1>{filteredVariant[0].variantTitle}</h1>
            <p className="date">{`${date.toLocaleString("default", {
              month: "short",
            })} ${date.getDate()} , ${time}`}</p>
            <div className="guest-info">
              <p>Adults : {adults}</p>
              <p>Children : {children}</p>
              <p>Infants : {infants}</p>
            </div>
            <p className="total">
              Total Payable : &#8377;
              {adults * filteredVariant[0].price.adult +
                children * filteredVariant[0].price.children +
                infants * filteredVariant[0].price.infants}
            </p>
          </div>
          <Link
            to={`/book/${experienceId}/${selectedVariant}/checkout?date=${date.toUTCString()}&&time=${time}&&adults=${adults}&&children=${children}&&infants=${infants}`}
          >
            <button className="btn-next">Next</button>
          </Link>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Book;

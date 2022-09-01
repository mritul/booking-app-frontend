import React, { useState } from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
export const Card = ({
  imgSrc,
  title,
  highlights,
  cost,
  duration,
  nextAvailable,
  experienceId,
  isLoading,
}) => {
  const date = new Date(nextAvailable);
  const nextAvailableString =
    date.toString().split(" ")[2] +
    " " +
    date.toString().split(" ")[1].toUpperCase();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="Card">
      <div className="image-section">
        {isLoading ? (
          <TailSpin
            height="70"
            width="70"
            color="skyblue"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : (
          <img alt="Tourist spot 1" src={imgSrc} />
        )}
      </div>
      <div className="content-section">
        <h1 className="content-title">{title}</h1>
        <h2>Highlights</h2>
        <div className="content-highlights">
          {highlights.slice(0, 2).map((highlight) => (
            <li className="content-highlight">{highlight}</li>
          ))}
        </div>
        {!isOpen && highlights.length > 2 && (
          <p className="more-details">more details...</p>
        )}
        {isOpen && (
          <div className="content-highlights more-highlights">
            {highlights.slice(2, highlights.length).map((highlight) => (
              <li className="content-highlight">{highlight}</li>
            ))}
          </div>
        )}
      </div>
      <div className="details-section">
        <p>
          <i className="fa-solid fa-indian-rupee-sign"></i>
          {cost}
        </p>
        <div className="btn-panel">
          <Link to={`/book/${experienceId}`}>
            <button className="check-availability-btn">
              Check Availabilty
            </button>
          </Link>
          <button
            className="more-details-btn"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="fa-solid fa-plus"></i>More Details
          </button>
        </div>
        <div className="other-details">
          <p>
            <i className="fa-solid fa-clock"></i>
            {duration}
          </p>
          <p>Next Available : {`${nextAvailableString} `}</p>
        </div>
      </div>
    </section>
  );
};
export default Card;

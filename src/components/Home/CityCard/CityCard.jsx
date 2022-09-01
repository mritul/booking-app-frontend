import React from "react";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

import "./CityCard.css";

const CityCard = ({ linkSrc, imgSrc, city, country, isLoading }) => {
  return (
    <Link to={`${linkSrc}`}>
      <div className="CityCard">
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
          <img src={imgSrc} alt={`City ${city}`} />
        )}

        <h1 className="city">{city}</h1>
        <p className="country">{country}</p>
      </div>
    </Link>
  );
};

export default CityCard;

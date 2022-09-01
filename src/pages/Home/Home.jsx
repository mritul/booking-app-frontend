import React, { useEffect, useState } from "react";
import CityCard from "../../components/Home/CityCard/CityCard";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/api/cities`,
    })
      .then((res) => {
        setCities(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  return (
    <div className="Home">
      <div className="cards-section-header">
        <h1 className="title">Explore World's Top Destinations</h1>
        {/* <Link to="">
          <span>
            See All <i className="fa-solid fa-angle-right"></i>
          </span>
        </Link> */}
      </div>
      <div className="cards-section">
        {cities.map((city, idx) => (
          <CityCard
            linkSrc={`things-to-do/${city.displayName.toLowerCase()}?cityId=${
              city._id
            }`}
            imgSrc={city.thumbnailSrc}
            city={city.displayName}
            country={city.country.displayName}
            key={idx}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

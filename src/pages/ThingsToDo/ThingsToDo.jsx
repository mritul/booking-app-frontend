import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./ThingsToDo.css";
import Card from "../../components/ThingsToDo/Card/Card";
import axios from "axios";
export const ThingsToDo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const cityId = searchParams.get("cityId");
  const [experiences, setExperiences] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/api/experiences?cityId=${cityId}`,
    })
      .then((res) => {
        setExperiences(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  return (
    <section className="ThingsToDo">
      <h1>Select an experience</h1>
      <div className="cards-container">
        {experiences.map((experience, idx) => (
          <Card
            isLoading={isLoading}
            imgSrc={experience.thumbnailSrc}
            title={experience.displayName}
            highlights={experience.highlights}
            cost={experience.startingPrice}
            duration={experience.duration}
            nextAvailable={experience.nextAvailable}
            key={idx}
            experienceId={experience._id}
          />
        ))}
      </div>
    </section>
  );
};

export default ThingsToDo;

import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";
export const NotFound = () => {
  return (
    <section className="NotFound">
      <img src="assets/not-found.svg" alt="404 Not Found" />
      <h1>
        The page you requested for is not found.{" "}
        <Link to="/">
          <span>Go back</span>
        </Link>{" "}
        to Homepage
      </h1>
    </section>
  );
};

export default NotFound;

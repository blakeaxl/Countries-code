import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="section home">
      <section className="home-container">
        <h1>Country data application</h1>
        <p>
          An application where you can find any information about any country!
        </p>
        <Link to="/Countries-page/countries">
          <button>Try to find your country!</button>
        </Link>
      </section>
    </div>
  );
};

export default Home;

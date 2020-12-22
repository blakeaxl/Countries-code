import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FavoritesCard = ({ item }) => {
  return (
    <Link
      to={"/Countries-page/countries/" + item.name}
      className="decoration-text"
    >
      <div className="card-container">
        <img src={item.flag} alt="country flag" className="flag" />
        <h1 className="card-title"> {item.name} </h1>
        <ul className="country-info-list">
          <li>
            Region: <span> {item.region}</span>{" "}
          </li>
          <li>
            Population: <span> {item.population}</span>{" "}
          </li>
          <li>
            Capital:<span> {item.capital}</span>{" "}
          </li>
        </ul>
      </div>
    </Link>
  );
};

export default FavoritesCard;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetFavoritesCountries } from "../redux/countriesDuks";
import FavoritesCard from "./FavoritesCard";

import logo from "../assets/images/favorites.png";

const Favorites = () => {
  const dispatch = useDispatch();

  const favorites = useSelector((store) => store.countries.favorites);

  useEffect(() => {
    dispatch(GetFavoritesCountries());
  }, []);

  return favorites.length === 0 ? (
    <div className="favorites-empty">
      <img src={logo} alt="" />
      <h2>
        Hey! Here you can save the countries that you do not want to forget or
        that you want to visit again
      </h2>
    </div>
  ) : (
    <div className="section">
      <div className="countries-container">
        {favorites.map((item) => (
          <FavoritesCard item={item} key={item.name} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;

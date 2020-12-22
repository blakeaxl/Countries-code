import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import logo from "../assets/images/logo.png";

import noResults from "../assets/images/oops.png";

import { GetCountries } from "../redux/countriesDuks";
import CountryCard from "./CountryCard";

const Countries = () => {
  const dispatch = useDispatch();

  const countries = useSelector((store) => store.countries.array);

  const [countriesTemplates, setCountriesTemplates] = useState([]);

  const [region, setRegion] = useState("All");

  const [countryName, setCountryName] = useState("");

  const countryNameFunction = (e) => {
    setCountryName(String(e.target.value));
  };

  const DetectRegionFilter = (e) => {
    setRegion(String(e.target.value));
  };

  const SearchFilter = () => {
    const filter = [];

    countriesTemplates.map((item) => {
      if (item.name.toLowerCase().indexOf(countryName.toLowerCase()) !== -1) {
        return filter.push(item);
      }
      return;
    });

    return filter;
  };

  useEffect(() => {
    setCountriesTemplates(countries);
  }, [countries]);

  useEffect(() => {
    if (region !== "All") {
      setCountriesTemplates(
        countries.filter(
          (item) => item.region.toLowerCase() === region.toLowerCase()
        )
      );
    } else {
      setCountriesTemplates(countries);
    }
  }, [region]);

  useEffect(() => {
    dispatch(GetCountries());
  }, []);

  return (
    <div className="section">
      <div className="search-options-container">
        <div className="filter">
          <h2>Filter by region:</h2>
          <select onChange={DetectRegionFilter} className="options-input">
            <option value="All">All</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
        <input
          type="text"
          name="search"
          placeholder="Type any country"
          onChange={countryNameFunction}
          className="search-bar"
          autoComplete="off"
        />
      </div>

      <div className="countries-container">
        {countriesTemplates.length === 0 ? (
          <div className="loading">
            <img src={logo} alt="loading icon" className="loading-logo" />
            <h2>Loading...</h2>
          </div>
        ) : SearchFilter().length === 0 ? (
          <div className="no-countries-found">
            <img src={noResults} alt="no results image" />
            <h2>Oops! sorry we couldn't find any country with that name.</h2>
          </div>
        ) : (
          SearchFilter().map((item) => (
            <CountryCard item={item} key={item.name} />
          ))
        )}
      </div>
    </div>
  );
};

export default Countries;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  AddToFavorites,
  GetFavoritesCountries,
  GetSingleCountryData,
  RemoveFromFavorites,
} from "../redux/countriesDuks";

const Country = () => {
  const countryName = useParams();

  const data = useSelector((store) => store.countries.singleCountry);

  const favorites = useSelector((store) => store.countries.favorites);

  const country = data[0] || [];

  const dispatch = useDispatch();

  const Itsaved = () => {
    const filter = favorites.filter((item) => item.name === country.name);

    if (filter.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    dispatch(GetSingleCountryData(countryName));

    dispatch(GetFavoritesCountries());

    console.log(data);
  }, []);

  return (
    <div className="section single-country">
      <div className="country-info-container">
        <img src={country.flag} alt="country flag" />
        <div className="country-titles">
          <h2>{country.name}</h2>
          <h3>Native name: {country.nativeName}</h3>
        </div>

        <ul className="principal-data">
          <li>
            Region: <span>{country.region}</span>{" "}
          </li>
          <li>
            Sub region: <span>{country.subregion}</span>{" "}
          </li>
          <li>
            Capital: <span>{country.capital}</span>{" "}
          </li>
          <li>
            Population: <span>{country.population}</span>{" "}
          </li>
          <li>
            Area: <span>{country.area}</span>{" "}
          </li>
        </ul>
        <ul className="data-list">
          <li>
            Alpha2code: <span>{country.alpha2Code}</span>{" "}
          </li>
          <li>
            Alpha3code <span>{country.alpha3Code}</span>{" "}
          </li>
          <li>
            Borders:
            <span>
              <ul>
                {country.borders !== undefined
                  ? country.borders.map((item) => <li key={item}> {item} </li>)
                  : undefined}
              </ul>
            </span>
          </li>
        </ul>
        <ul className="final-data">
          <li>
            Calling codes:
            <span>
              <ul>
                {country.callingCodes !== undefined
                  ? country.callingCodes.map((item) => (
                      <li key={item}> {item} </li>
                    ))
                  : undefined}
              </ul>
            </span>
          </li>
          <li>
            Time zones:
            <span>
              <ul>
                {country.timezones !== undefined
                  ? country.timezones.map((item) => (
                      <li key={item}> {item} </li>
                    ))
                  : undefined}
              </ul>
            </span>
          </li>
        </ul>
        <div className="country-buttons">
          <Link to="/Countries-page/countries">
            <button>Go to countries</button>
          </Link>
          <button
            onClick={(e) => {
              console.log(e.target.innerHTML);
              if (e.target.innerHTML === "add to favorites") {
                dispatch(AddToFavorites(country));
                e.target.innerHTML = "remove from favorites";
              } else {
                dispatch(RemoveFromFavorites(country));
                e.target.innerHTML = "add to favorites";
              }
            }}
          >
            {!Itsaved() ? "add to favorites" : "remove from favorites"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Country;

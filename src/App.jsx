import React, { Fragment } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Link,
  NavLink,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import logo from "./assets/images/logo.png";

import "./App.css";
import Countries from "./Components/Countries";
import Country from "./Components/Country";
import Home from "./Components/Home";
import Favorites from "./Components/Favorites";

function App() {
  return (
    <Fragment>
      <Router>
        <header className="header">
          <Link to="/Countries-page/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
          <ul className="header-list">
            <li>
              <NavLink
                to="/Countries-page/"
                exact
                className="header-link"
                activeClassName="nav-active"
                className="nav-item"
              >
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Countries-page/countries"
                exact
                className="header-link"
                activeClassName="nav-active"
                className="nav-item"
              >
                COUNTRIES
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Countries-page/favorites"
                className="header-link"
                activeClassName="nav-active"
                className="nav-item"
              >
                FAVORITES
              </NavLink>
            </li>
          </ul>
          <input type="checkbox" className="toggle-menu" />
          <div className="hamburguer-menu">
            <div className="line first-line"></div>
            <div className="line second-line"></div>
            <div className="line last-line"></div>
          </div>

          <ul className="header-list-mobile">
            <li>
              <NavLink
                to="/Countries-page/"
                exact
                className="header-link"
                activeClassName="nav-active"
                className="nav-item"
              >
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Countries-page/countries"
                exact
                className="header-link"
                activeClassName="nav-active"
                className="nav-item"
              >
                COUNTRIES
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Countries-page/favorites"
                className="header-link"
                activeClassName="nav-active"
                className="nav-item"
              >
                FAVORITES
              </NavLink>
            </li>
          </ul>
        </header>
        <main className="main">
          <Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  timeout={500}
                  classNames="fade"
                >
                  <Switch location={location}>
                    <Route path="/Countries-page/countries/:country">
                      <Country />
                    </Route>
                    <Route path="/Countries-page/countries">
                      <Countries />
                    </Route>
                    <Route path="/Countries-page/favorites">
                      <Favorites />
                    </Route>
                    <Route path="/Countries-page" exact>
                      <Home />
                    </Route>
                    <Route path="*">
                      <h1>Error 404 Not Found</h1>
                    </Route>
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
        </main>
      </Router>
    </Fragment>
  );
}

export default App;

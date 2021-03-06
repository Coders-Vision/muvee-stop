import { React, useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHeart } from "@fortawesome/free-solid-svg-icons";
import "../../styles/Header/Header.css";
import AutoSuggest from "./AutoSuggest";
import logo from "./logo.svg";
import { FavouriteMoviesContext } from "../Context/FavouriteMoviesState";
function Header() {
  const [toggle, setToggle] = useState(false);
  const { getFavMoviesCount } = useContext(FavouriteMoviesContext);
  const favMoviesCount = getFavMoviesCount();

  const showFavMoviesCount = () => {
    return favMoviesCount > 0 ? (
      <span className="badge position-absolute top-0 left-100 translate-middle bg-danger">
        {favMoviesCount}
      </span>
    ) : (
      ""
    );
  };

  return (
    <header className="header dark-theme">
      <div className="responsive">
        <div className="left-header">
          <div className="btn-wrapper">
            <button onClick={() => setToggle(!toggle)} className="ham-menu">
              <FontAwesomeIcon className="icons bars" icon={faBars} />
            </button>
          </div>
          <div className="brand-logo">
            <Link to={`/`}>
              <img src={logo} alt="muvee" />
            </Link>
          </div>
          <div className="favourite-container">
            <Link to={"/favourite"}>
              <Button variant="outline-info">
                <FontAwesomeIcon icon={faHeart} />
                {showFavMoviesCount()}
              </Button>
            </Link>
          </div>
        </div>
        <div className="right-header">
          <div className="auto-wrapper-suggest">
            <AutoSuggest />
          </div>
        </div>
      </div>
      <div className={!toggle ? `links-to-pages hide` : `links-to-pages`}>
        <NavLink
          activeClassName="active"
          exact
          to={`/`}
          onClick={() => setToggle(false)}
          className="link-page"
        >
          HOME
        </NavLink>
        <NavLink
          to={`/genre`}
          activeClassName="active"
          onClick={() => setToggle(false)}
          className="link-page"
        >
          GENRE
        </NavLink>
        <NavLink
          to={`/popular`}
          onClick={() => setToggle(false)}
          className="link-page"
        >
          POPULAR
        </NavLink>
        <NavLink
          to={`/toprated`}
          onClick={() => setToggle(false)}
          className="link-page"
        >
          TOP-RATED
        </NavLink>
        <NavLink
          to={`/upcoming`}
          onClick={() => setToggle(false)}
          className="link-page"
        >
          UPCOMING
        </NavLink>
      </div>
    </header>
  );
}

export default Header;

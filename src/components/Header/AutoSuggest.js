import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { getMoviesByQuery } from "../../apiService/api";
import "../../styles/Header/AutoSuggest.css";

import defaultPoster from "../Main/default-poster.svg";
const AutoSuggest = () => {
  const MoviePage = useHistory();
  const [Search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [Suggestion, setSuggestion] = useState([]);
  const [KeyUpDownCounter, setKeyUpDownCounter] = useState(0);
  const List = useRef([]);

  useEffect(() => {
    List.current = List.current.slice(0, Suggestion.length);
  }, [Suggestion]);

  useEffect(() => {
    const showSuggesstionBox = async () => {
      if (Search.length > 0) {
        const movie = await getMoviesByQuery(Search);
        movie !== undefined
          ? setSuggestion((suggest) => [...suggest, ...movie])
          : setShow(false);
        setShow(true);
      } else setShow(false);
    };
    showSuggesstionBox();
  }, [Search]);

  const handleOnTextChange = (e) => {
    setSuggestion([]);
    const { value } = e.target;
    setSearch(value);
  };

  const handleListClick = (value) => {
    const { id, title } = value;
    setSearch(title);
    setShow(false);
    setSuggestion([]);
    MoviePage.push(`/movie/${id}`);
    setSearch("");
    setSuggestion([]);
  };

  const renderList = Suggestion.map((dat, index) => {
    return (
      <>
        <li
          ref={(el) => (List.current[index] = el)}
          onClick={() => handleListClick(dat)}
          key={dat.id}
          className={
            KeyUpDownCounter === index ? "movie-info active" : "movie-info"
          }
        >
          <div className="image-container">
            <img
              className="movie-poster"
              src={dat.poster}
              alt={dat.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultPoster;
              }}
            />
          </div>
          <div className="basic-info">
            <div className="movie-title"> {dat.title}</div>
            <div className="movie-year"> {dat.year}</div>
          </div>
        </li>
      </>
    );
  });
  const handleKeyNavigation = (e) => {
    if (e.keyCode === 38 && KeyUpDownCounter > 0) {
      List.current[KeyUpDownCounter].scrollIntoView({
        behavior: "smooth",
      });
      setKeyUpDownCounter((preCounter) => preCounter - 1);
    }
    if (e.keyCode === 40 && KeyUpDownCounter < Suggestion.length - 1) {
      List.current[KeyUpDownCounter].scrollIntoView({
        behavior: "smooth",
      });
      setKeyUpDownCounter((preCounter) => preCounter + 1);
    }
    if (e.keyCode === 8) {
      setKeyUpDownCounter(0);
    }

    if (e.keyCode === 13 && Suggestion.length > 0) {
      const selectMovieName =
        Suggestion.length > 0 ? Suggestion[KeyUpDownCounter].title : Search;
      setSearch(selectMovieName);
      MoviePage.push(`/movie/${Suggestion[KeyUpDownCounter].id}`);
      setShow(false);
      setKeyUpDownCounter(0);
      setSearch("");
      setSuggestion([]);
    }
  };

  return (
    <div className="AutoCompleteText">
      <input
        value={Search}
        type="text"
        placeholder="Search"
        onChange={handleOnTextChange}
        onKeyDown={handleKeyNavigation}
      />
      <svg className="search-icon" viewBox="0 0 24 24">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
      {show ? <ul>{renderList}</ul> : ""}
    </div>
  );
};

export default AutoSuggest;

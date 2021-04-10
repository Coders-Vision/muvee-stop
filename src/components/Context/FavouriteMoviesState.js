import { React, createContext, useState } from "react";

export const FavouriteMoviesContext = createContext();

export const FavouriteMoviesProvider = (props) => {
  const getFavMovies = localStorage.getItem("movies")
    ? [...JSON.parse(localStorage.getItem("movies"))]
    : [];

  const [favMoviesID, setFavMoviesID] = useState(getFavMovies);

  const addFavMovie = (mid) => {
    const addMovie = [...favMoviesID, { movieId: mid }];
    setFavMoviesID([...addMovie]);
    localStorage.setItem("movies", JSON.stringify([...addMovie]));
  };

  const removeFavMovie = (mid) => {
    const removeMovie = favMoviesID.filter((id) => id.movieId !== mid);
    setFavMoviesID([...removeMovie]);
    localStorage.setItem("movies", JSON.stringify([...removeMovie]));
  };

  const getFavMoviesCount = () => {
    return favMoviesID.length;
  };
  const checkFavMovie = (mid) => {
    const check = favMoviesID.some((id) => id.movieId === mid);
    return check;
  };
  const getFavMoviesId = () => {
    const favMovies = [...favMoviesID];
    return favMovies;
  };

  return (
    <FavouriteMoviesContext.Provider
      value={{
        removeFavMovie,
        addFavMovie,
        getFavMoviesCount,
        checkFavMovie,
        getFavMoviesId,
      }}
    >
      {props.children}
    </FavouriteMoviesContext.Provider>
  );
};

import React from "react";
import MovieCast from "./MovieCast";
import MovieDetails from "./MovieDetails";
import "../../../styles/Main/Movie.css";
import SimilarMovies from "./SimilarMovies";
function Movie({ match }) {
  const { id } = match.params;
  
  return (
    <>
      <MovieDetails id={id} />
      <MovieCast id={id} />
      <SimilarMovies id={id} />
    </>
  );
}

export default Movie;

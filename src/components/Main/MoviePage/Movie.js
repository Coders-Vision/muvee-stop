import React from "react";
import MovieCast from "./MovieCast";
import MovieDetails from "./MovieDetails";
import "../../../styles/Main/Movie.css";
import SimilarMovies from "./SimilarMovies";
import SEO from ".././SEOComponent/SEO";
function Movie({ match }) {
  const { id } = match.params;

  return (
    <>
      <SEO
        title={`Muvee Stop | Movie Details`}
        description={`Search your favourite on Movie Stop by Movie Details`}
        ogTitle={"Muvee Stop | Movie Details`"}
        ogDescription={`Search your favourite on Movie Stop by Movie Details`}
      />
      <MovieDetails id={id} />
      <MovieCast id={id} />
      <SimilarMovies id={id} />
    </>
  );
}

export default Movie;

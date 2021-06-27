import React from "react";
import "../../../styles/Main/Home.css";
import PopularMovies from "./PopularMovies";
import NowPlaying from "./NowPlaying";
import TrendingMovies from "./TrendingMovies";
import SEO from ".././SEOComponent/SEO";

function Home() {
  return (
    <>
      <SEO
        title={"Muvee Stop | Search Movies for Free"}
        description={`Search online movies for free, search movies free without registration.  Just a better place for searching movies online for free. Muvee Stop, muvee.stop, muvee stop`}
        keywords={`muvee stop, muvee, search movies, online movie, movie online, search movies online, search movies online free, hd movies, search movies online,`}
        ogTitle={"Muvee Stop | Search Movies for Free"}
        ogDescription={
          "Search online movies for free, search movies free without registration.Just a better place for searching movies online for free. Muvee Stop, muvee.stop, muvee stop."
        }
      />
      <NowPlaying />
      <TrendingMovies />
      <PopularMovies />
    </>
  );
}

export default Home;

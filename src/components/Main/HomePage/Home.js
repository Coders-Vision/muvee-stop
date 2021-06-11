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
        title={"Muvee Stop"}
        description={"Search all your favourite Movies at Muvee Stop."}
        keywords={`Muvee Stop, Muvee, movie database, online movie, movie online,movies online,`}
        ogTitle={"Muvee Stop"}
        ogDescription={"Search all your favourite Movies at Muvee Stop."}
      />
      <NowPlaying />
      <TrendingMovies />
      <PopularMovies />
    </>
  );
}

export default Home;

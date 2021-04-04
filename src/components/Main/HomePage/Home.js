import React from "react";
import "../../../styles/Main/Home.css";
import PopularMovies from "./PopularMovies";
import NowPlaying from "./NowPlaying";
import TrendingMovies from "./TrendingMovies";
function Home() {
  return (
    <>
      <NowPlaying />
      <TrendingMovies />
      <PopularMovies />
    </>
  );
}

export default Home;

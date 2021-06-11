import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import { FavouriteMoviesProvider } from "./components/Context/FavouriteMoviesState";
import { Helmet } from "react-helmet";
import SEO from "./components/Main/SEOComponent/SEO";

function App() {
  return (
    <div className="App">
      <Router>
        <SEO
          title={`Muvee Stop`}
          description={`Search your favourite on Movie Stop`}
          keywords={`Genre,Popular,Top-Rated,Upcoming`}
          ogTitle={"Muvee Stop"}
          ogDescription={`Search your favourite on Movie Stop`}
        />
        <FavouriteMoviesProvider>
          <Header />
          <Main />
          <Footer />
        </FavouriteMoviesProvider>
      </Router>
    </div>
  );
}

export default App;

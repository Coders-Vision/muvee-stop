import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import { FavouriteMoviesProvider } from "./components/Context/FavouriteMoviesState";

function App() {
  return (
    <div className="App">
      <Router>
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

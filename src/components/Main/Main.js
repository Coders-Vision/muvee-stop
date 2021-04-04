import React from "react";
import { Route, Switch } from "react-router-dom";
import "../../styles/Main/Main.css";

import Home from "./HomePage/Home";
import Genre from "./GenrePage/Genre";
import Popular from "./PopularPage/Popular";
import TopRated from "./TopRatedPage/TopRated";
import Upcoming from "./UpcomingPage/Upcoming";
import Movie from "./MoviePage/Movie";
import Celebrity from "./CelebrityPage/Celebrity";
import NotFoundPage from "./NotFoundPage";
import { Container } from "react-bootstrap";

function Main() {
  return (
    <div className="main">
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/genre" component={Genre} />
          <Route path="/popular" component={Popular} />
          <Route path="/toprated" component={TopRated} />
          <Route path="/upcoming" component={Upcoming} />
          <Route path="/movie/:id" component={Movie} />
          <Route path="/celebrity/:id" component={Celebrity} />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    </div>
  );
}

export default Main;

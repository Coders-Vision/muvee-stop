import React from "react";
import { Route, Switch } from "react-router-dom";
import "../../styles/Main/Main.css";
import { Container } from "react-bootstrap";

const Home = React.lazy(() => import("./HomePage/Home"));
const Genre = React.lazy(() => import("./GenrePage/Genre"));
const Popular = React.lazy(() => import("./PopularPage/Popular"));
const TopRated = React.lazy(() => import("./TopRatedPage/TopRated"));
const Upcoming = React.lazy(() => import("./UpcomingPage/Upcoming"));
const Movie = React.lazy(() => import("./MoviePage/Movie"));
const Celebrity = React.lazy(() => import("./CelebrityPage/Celebrity"));
const Favourite = React.lazy(() => import("./FavouritePage/Favourite"));
const NotFoundPage = React.lazy(() => import("./NotFoundPage"));

function Main() {
  const Loading = () => {
    return (
      <>
        <div className="ptb-100">
          <h1>Loading</h1>
        </div>
      </>
    );
  };

  return (
    <div className="main">
      <Container>
        <React.Suspense fallback={Loading}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/genre" component={Genre} />
            <Route path="/popular" component={Popular} />
            <Route path="/toprated" component={TopRated} />
            <Route path="/upcoming" component={Upcoming} />
            <Route path="/movie/:id" component={Movie} />
            <Route path="/celebrity/:id" component={Celebrity} />
            <Route path="/favourite" component={Favourite} />
            <Route component={NotFoundPage} />
          </Switch>
        </React.Suspense>
      </Container>
    </div>
  );
}

export default Main;

import React from "react";
import { Route, Switch } from "react-router-dom";
import "../../styles/Main/Main.css";
import { Container, Spinner } from "react-bootstrap";
import SEO from "./SEOComponent/SEO";
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
        <div className="" style={{padding:"25%"}}>
          <Spinner animation="border" />
        </div>
      </>
    );
  };

  return (
    <div className="main">
      <SEO
        title={"Muvee Stop | Search Movies for Free"}
        description={`Search online movies for free, search movies free without registration.Just a better place for searching movies online for free.`}
        keywords={`muvee stop, muvee, search movies, online movie, movie online, search movies online, search movies online free, hd movies, search movies online,`}
        ogTitle={"Muvee Stop | Search Movies for Free"}
        ogDescription={
          "Search online movies for free, search movies free without registration.Just a better place for searching movies online for free. Muvee Stop, muvee.stop, muvee stop."
        }
      />
      <Container>
        <React.Suspense fallback={Loading()}>
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

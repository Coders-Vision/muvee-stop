import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Image, Toast } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { getMovieById } from "../../../apiService/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FavouriteMoviesContext } from "../../Context/FavouriteMoviesState";
import SEO from ".././SEOComponent/SEO";
function Favourite() {
  const [favourite, setFavourite] = useState([]);
  const { removeFavMovie, getFavMoviesId } = useContext(FavouriteMoviesContext);
  const favMoviesId = getFavMoviesId();

  const poster = "https://image.tmdb.org/t/p/w300/";
  useEffect(() => {
    const fetchFavourite = () => {
      favMoviesId.map(async (movie) => {
        const fetchedData = await getMovieById(movie.movieId);
        setFavourite((movies) => [...movies, fetchedData]);
      });
    };
    fetchFavourite();
  }, []);

  const skeletonCardImage = () => {
    return (
      <SkeletonTheme color="#243142" highlightColor="#364963">
        <Skeleton height={`50vh`} width={"100%"} />
      </SkeletonTheme>
    );
  };

  const defaultMovie = () => {
    return (
      <Col>
        <div className="text-center">
          <h4>Favourite List Empty</h4>
        </div>
      </Col>
    );
  };
  const removeMovie = (mid) => {
    removeFavMovie(mid);
    const remove = favourite.filter((movie) => movie.id !== mid);
    setFavourite([...remove]);
  };

  const generateSeoTags = () => {
    return (
      <SEO
        title={`Muvee Stop | Favourites`}
        description={"All browse all your favourites movies"}
        ogTitle={`Muvee Stop | Favourites`}
        ogDescription={"All browse all your favourites movies"}
      />
    );
  };

  const showFavourite =
    favourite &&
    favourite.map((movie) => {
      return (
        <>
          {generateSeoTags()}
          <Col className="mb-4" xs="6" md="3" sm="3" key={movie.id}>
            <Card>
              <div className="card-container">
                <Link to={`/movie/${movie.id}`}>
                  <Image
                    className="rounded"
                    fluid
                    src={poster + movie.poster}
                    alt={movie.title}
                  />
                </Link>
                <div className="badge-corner badge-corner-base">
                  <span>
                    <FontAwesomeIcon
                      color={"crimson"}
                      icon={faTimesCircle}
                      onClick={() => removeMovie(movie.id)}
                    />
                  </span>
                </div>
              </div>
            </Card>
            <div className="mt-3">
              <div className="text-center">{movie.title}</div>
              <div className="text-center text-white-50">
                {movie.year.substr(0, 4)}
              </div>
            </div>
          </Col>
        </>
      );
    });

  const wrapFavourite = () => {
    return (
      <>
        <p className="font-weight-bold">FAVOURITE MOVIES</p>
        <Row className="mt-3">{showFavourite}</Row>
      </>
    );
  };

  return (
    <>
      <div className="favourite mt-4">
        {favourite.length > 0 ? wrapFavourite() : defaultMovie()}
      </div>
    </>
  );
}

export default Favourite;

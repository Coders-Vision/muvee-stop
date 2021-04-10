import { React, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Image } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { getCelebrityMovies } from "../../../apiService/api";
import defaultPoster from "../default-poster.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSol } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartReg } from "@fortawesome/free-regular-svg-icons";
import { FavouriteMoviesContext } from "../../Context/FavouriteMoviesState";

function Filmography({ id }) {
  const [filmography, setFilmography] = useState(null);

  const { checkFavMovie, addFavMovie, removeFavMovie } = useContext(
    FavouriteMoviesContext
  );

  useEffect(() => {
    window.scroll(0, 0);
    const fetchFilmography = async () => {
      const fetchedData = await getCelebrityMovies(id);
      if (fetchedData) {
        setFilmography(null);
        setFilmography(fetchedData[1]);
      }
    };
    fetchFilmography();
  }, [id]);

  const skeletonCardImage = () => {
    return (
      <SkeletonTheme color="#243142" highlightColor="#364963">
        <Skeleton height={`50vh`} width={"100%"} />
      </SkeletonTheme>
    );
  };

  const skeletonCard = () => {
    return [1, 2, 3, 4].map((times) => {
      return (
        <Col xs="6" md="3" sm="3" key={times}>
          <Card>{skeletonCardImage()}</Card>
          <div className="mt-3">
            <div className="text-center">
              <SkeletonTheme color="#243142" highlightColor="#364963">
                <Skeleton width={100} />
              </SkeletonTheme>
            </div>
            <div className="text-center text-white-50">
              <SkeletonTheme color="#243142" highlightColor="#364963">
                <Skeleton width={100} />
              </SkeletonTheme>
            </div>
          </div>
        </Col>
      );
    });
  };

  const showFavIcon = (mid) => {
    const check = checkFavMovie(mid);
    return check ? (
      <FontAwesomeIcon
        color={"crimson"}
        icon={faHeartSol}
        onClick={() => removeFavMovie(mid)}
      />
    ) : (
      <FontAwesomeIcon
        color={"crimson"}
        icon={faHeartReg}
        onClick={() => addFavMovie(mid)}
      />
    );
  };

  const showFilmography =
    filmography &&
    filmography.slice(0, 8).map((movie, index) => {
      return (
        <Col xs="6" md="3" sm="3" key={index} className="mb-4">
          <Card>
            <div className="card-container">
              <Link to={`/movie/${movie.id}`}>
                <Image
                  className="rounded"
                  fluid
                  src={movie.poster}
                  alt={movie.title}
                />
              </Link>
              <div className="badge-corner badge-corner-base">
                <span>{showFavIcon(movie.id)}</span>
              </div>
            </div>
          </Card>
          <div className="mt-3">
            <div className="text-center">{movie.title}</div>
            <div className="text-center text-white-50">{movie.year}</div>
          </div>
        </Col>
      );
    });

  return (
    <>
      <Row className="mt-3">
        <Col>
          <p className="font-weight-bold">SELECTED FILMOGRAPHY</p>
        </Col>
      </Row>
      <Row className="mt-3">{showFilmography || skeletonCard()}</Row>
    </>
  );
}

export default Filmography;

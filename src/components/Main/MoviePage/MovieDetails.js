import { React, useState, useEffect, useContext } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilm,
  faStar,
  faHeart as faHeartSol,
} from "@fortawesome/free-solid-svg-icons";
import {
  faPlayCircle,
  faHeart as faHeartReg,
  faStar as regularStar,
} from "@fortawesome/free-regular-svg-icons";

import Rating from "react-rating";
import { getMovieById } from "../../../apiService/api";
import defaultBanner from "../default-banner.svg";
import defaultPoster from "../default-poster.svg";
import PlayerModal from "./PlayerModal";
import { FavouriteMoviesContext } from "../../Context/FavouriteMoviesState";

function MovieDetails({ id }) {
  const banner = "https://image.tmdb.org/t/p/original/";
  const [isOpen, setIsOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);

  const { checkFavMovie, addFavMovie, removeFavMovie } = useContext(
    FavouriteMoviesContext
  );

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setMovieDetails(null);
      setMovieDetails(await getMovieById(id));
    };
    fetchMovieDetails();
  }, [id]);

  const showPlayerModal = () => {
    return (
      <PlayerModal
        show={isOpen}
        onHide={() => setIsOpen(false)}
        title={movieDetails && movieDetails.title}
        movieId={movieDetails && movieDetails.id}
      ></PlayerModal>
    );
  };

  const skeletonBanner = () => {
    return (
      <SkeletonTheme color="#243142" highlightColor="#364963">
        <Skeleton height={`40vh`} />
      </SkeletonTheme>
    );
  };

  const showMovieBanner = () => {
    return (
      <>
        <div className="moviePoster ">
          <Image
            fluid
            src={
              movieDetails.banner
                ? `${banner}${movieDetails.banner}`
                : defaultBanner
            }
            alt={movieDetails.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultBanner;
            }}
            className="image-banner "
          />
          <FontAwesomeIcon
            className="play-icon"
            size="6x"
            cursor={"pointer"}
            color={"#003866"}
            icon={faPlayCircle}
            onClick={() => setIsOpen(true)}
          />
        </div>
      </>
    );
  };

  const showMovieGenre =
    movieDetails &&
    movieDetails.genres.map((info, index) => {
      return (
        <li key={index} className="list-inline-item">
          <Button variant="outline-info">{info.name}</Button>
        </li>
      );
    });

  const skeletonMovieDetails = () => {
    return (
      <>
        <Col className="d-none d-md-block" xs={12} md={2}>
          <SkeletonTheme color="#243142" highlightColor="#364963">
            <Skeleton width={"10vw"} height={"30vh"} />
          </SkeletonTheme>
        </Col>
        <Col xs={12} md={8}>
          <Row className="justify-content-md-center">
            <SkeletonTheme color="#243142" highlightColor="#364963">
              <Skeleton width={100} />
            </SkeletonTheme>
          </Row>
          <Row className="text-center">
            <Col className="mt-3">
              <SkeletonTheme color="#243142" highlightColor="#364963">
                <Skeleton width={100} />
              </SkeletonTheme>
            </Col>
            <Col className="mt-3">
              <SkeletonTheme color="#243142" highlightColor="#364963">
                <Skeleton width={100} />
              </SkeletonTheme>
            </Col>
          </Row>
          <Row>
            <SkeletonTheme color="#243142" highlightColor="#364963">
              <Skeleton width={"45vw"} />
            </SkeletonTheme>

            <SkeletonTheme color="#243142" highlightColor="#364963">
              <Skeleton width={"35vw"} />
            </SkeletonTheme>
          </Row>
          <dl className="row">
            <dt className="col-sm-3 mt-2">Country:</dt>
            <dd className="col-sm-9 mt-2">
              <SkeletonTheme color="#243142" highlightColor="#364963">
                <Skeleton width={100} />
              </SkeletonTheme>
            </dd>
            <dt className="col-sm-3 mt-2">Year:</dt>
            <dd className="col-sm-9 mt-2">
              <SkeletonTheme color="#243142" highlightColor="#364963">
                <Skeleton width={100} />
              </SkeletonTheme>
            </dd>
            <dt className="col-sm-3 mt-2">Genre:</dt>
            <dd className="col-sm-9 mt-2">
              <li className="list-inline-item">
                <SkeletonTheme color="#243142" highlightColor="#364963">
                  <Skeleton width={100} count={4} />
                </SkeletonTheme>
              </li>
            </dd>
          </dl>
        </Col>
      </>
    );
  };

  const showFavouriteButton = (mid) => {
    return (
      <div className="fav-btn mx-auto">
        {checkFavMovie(mid) ? (
          <>
            <span className="badge p-2">
              <FontAwesomeIcon icon={faHeartSol} />
              {" Favourite Movie "}
            </span>
            <Button
              className="ml-4"
              variant="outline-info"
              onClick={() => removeFavMovie(mid)}
            >
              {" Remove"}
            </Button>
          </>
        ) : (
          <>
            <Button
              className="ml-4"
              variant="outline-info"
              onClick={() => addFavMovie(mid)}
            >
              {" Add to Favourite"}
            </Button>
          </>
        )}
      </div>
    );
  };
  const showMovieDetails = () => {
    return (
      <>
        <Col className="d-none d-md-block mt-5" xs={12} md={2}>
          <img
            src={
              movieDetails.poster
                ? `${banner}${movieDetails.poster}`
                : defaultPoster
            }
            className="img-fluid  img-thumbnail w-100 rounded float-left"
            alt={movieDetails.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultPoster;
            }}
          />
        </Col>
        <Col xs={12} md={8}>
          <Row className="text-center">
            <h3 className="w-100">{movieDetails.title}</h3>
          </Row>
          <Row className="w-100 mt-2">
            {showFavouriteButton(movieDetails.id)}
          </Row>
          <Row className="text-center mt-2">
            <Col className="mt-2">
              <Rating
                initialRating={movieDetails.voteAvg}
                readonly
                emptySymbol={<FontAwesomeIcon icon={regularStar} />}
                fullSymbol={<FontAwesomeIcon icon={faStar} />}
                fractions={2}
                stop={10}
                step={2}
              />
              <div className="text-center text-white-50">{`${movieDetails.voteAvg} of ${movieDetails.voteCount}`}</div>
            </Col>
            <Col className="mt-2">
              <FontAwesomeIcon icon={faFilm} />
              {`  ${movieDetails.runtime} min`}
            </Col>
          </Row>
          <Row>
            <p className="text-justify p-2">{movieDetails.overview}</p>
          </Row>
          <dl className="row">
            <dt className="col-sm-3 mt-2">Country:</dt>
            <dd className="col-sm-9 mt-2">
              {movieDetails.country[0] && movieDetails.country[0].name}
            </dd>
            <dt className="col-sm-3 mt-2">Year:</dt>
            <dd className="col-sm-9 mt-2">{`${movieDetails.year.substr(
              0,
              4
            )}`}</dd>
            <dt className="col-sm-3 mt-2">Genre:</dt>
            <dd className="col-sm-9 mt-2">{showMovieGenre}</dd>
          </dl>
        </Col>
      </>
    );
  };

  return (
    <>
      <Row className="mt-2 ">
        {movieDetails ? showPlayerModal() : ""}
        <Col>{movieDetails ? showMovieBanner() : skeletonBanner()}</Col>
      </Row>
      <Row className="p-4 mt-5 shadow-sm shadow-lg">
        {movieDetails ? showMovieDetails() : skeletonMovieDetails()}
      </Row>
    </>
  );
}

export default MovieDetails;
